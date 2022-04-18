//Nikolai Leday CSC 2463 Assignment 12, 3.4 Controller
let background;    //background
let spriteSheet;     //Spritesheet for the bugs
let bugList = [];  //an array of all the bugs on the screen
let numBugs;       //Number of bugs on the screen
let speedMult = 1;//Speed multipler to change speed of bugs
let startTime;
let timeRemaining = 30;
let gameState = "start"; //"Start" game has not started. "playing" game is currently in play. "endL" or "endW" game is over

var vol = new Tone.Volume(-10).toDestination();
const sounds = new Tone.Players({
  0 : "https://nleday1212.github.io/CSC2463/Assignment12/sounds/squish1.wav",
  1 : "https://nleday1212.github.io/CSC2463/Assignment12/sounds/squish2.ogg",
  2 : "https://nleday1212.github.io/CSC2463/Assignment12/sounds/squish3.wav",
  "win" : "https://nleday1212.github.io/CSC2463/Assignment12/sounds/win.mp3",
  "lose": "https://nleday1212.github.io/CSC2463/Assignment12/sounds/lose.wav",
  "strike": "https://nleday1212.github.io/CSC2463/Assignment12/sounds/strike.wav"
}).connect(vol);
let synth = new Tone.Synth().connect(vol);
let seq = new Tone.Sequence((time, note) =>{
  synth.triggerAttackRelease(note, .01, time);
}, ["C4", "D4", ["D4", "E4", "F4"], "E4", "D4", "C4", ["D4", "E4"], "F4", "F4", "F4", "A4", "A4", "A4", ["D4", "E4"]]).start(0);


function preload(){
  background = loadImage("https://nleday1212.github.io/CSC2463/Assignment8/images/BugBackground.png");
  spriteSheet = loadImage("https://nleday1212.github.io/CSC2463/Assignment8/images/BugSprites.png")
}

function setup() {
  createCanvas(800, 800);
  //Creating the bug objects
  speedMult = 1;
  Tone.Transport.bpm.value = 90;
  //While loop deletes bug objects from array to account for game restarts. Fixes isse with going down in difficulty
  while(bugList.length > 0){
    bugList.pop();
  }
  //Creates the bug objects
  for(let i =0; i <= numBugs -1; i++){
    let thisBug = new Bug(spriteSheet, random(50, 750), random(50, 750), Math.floor(Math.random() * (3 - 0 + 1)) + 0);
    bugList[i] = thisBug;
  }
}

function draw(){
  image(background, 0, 0, 800, 800);
  if(gameState == "start"){//Game has not been started 
    //Creating the start menu
    push();
    fill(204, 198, 198);
    rect(150, 250, 490, 140, 10);
    fill(0, 0, 0);
    textSize(40);
    text("Select a difficulty to start! ", 175, 300);
    fill(146,255,112);//easy
    rect(220, 325, 100, 40, 10);
    fill(228,255,51);//medium
    rect(345, 325, 100, 40, 10);
    fill(255, 31, 31);//hard
    rect(470, 325, 100, 40, 10);
    fill(0, 0, 0);
    textSize(24);
    text("  Easy        Medium        Hard", 230, 352);
    pop();
  }else if(gameState == "playing"){
    push();
    imageMode(CENTER);
    for(let i =0; i <= bugList.length -1; i++){
      bugList[i].draw();
    }
    pop();
    push();
    fill(204, 198, 198);
    rect(3, 10, 230, 55, 10);
    checkTime();
    textSize(24);
    fill(0,0,0);
    text("Bugs Remaining: " + getBugsLeft(), 10, 30);
    timeRemaining = 30 - timer();
    text("Time Remaining: " + timeRemaining, 10, 60);
    pop();
  }else{ //GAMESTATE == "endL" (loss) or "endW" (win)
    push();
    imageMode(CENTER);
    for(let i =0; i <= bugList.length -1; i++){
      bugList[i].draw();
    }
    textSize(24);
    push();
    fill(204, 198, 198);
    rect(3, 10, 230, 55, 10);
    checkTime();
    textSize(24);
    fill(0,0,0);
    text("Bugs Remaining: " + getBugsLeft(), 10, 30);
    timeRemaining = 30 - timer();
    text("Time Remaining: " + timeRemaining, 10, 60);
    pop();
    if(gameState == "endL"){//Game over screen on loss
      fill(204, 198, 198);
      rect(150, 250, 490, 140, 10);
      fill(0, 0, 0);
      textSize(40);
      text("Out of time!", 290, 300);
      fill(77, 166, 255);
      rect(345, 325, 100, 40, 10);//reset button
      textSize(24);
      fill(0);
      text("Reset", 363, 353);
    }else{ //Game over screen upon win
      fill(204, 198, 198);
      rect(150, 250, 490, 180, 10);
      fill(0, 0, 0);
      textSize(40);
      text("Congratulations!", 250, 300);
      text("All bugs squished!", 240, 350);
      fill(77, 166, 255);
      rect(345, 370, 100, 40, 10);//reset button
      textSize(24);
      fill(0);
      text("Reset", 363, 398);
    }
    
    pop();
  }
}


//This function checks all the bugs to see if mouse is over a bug
function mouseReleased(){
  if(gameState == "playing"){
    for(let i =0; i <= bugList.length -1; i++){
      bugList[i].checkSquish();
    }
  }
}

//This function is used to transition between game modes
function mousePressed(){
  //These if statements are for determing which difficult in the "start" game mode base on mouseX and mouseY
  if(gameState == "start"){
    if(mouseX > 220 && mouseX < 320 && mouseY > 325 && mouseY < 365){
      numBugs = 10;
      startTime  = millis();
      gameState = "playing";
      setup();
      Tone.Transport.start();
    }
    else if(mouseX > 345 && mouseX < 445 && mouseY > 325 && mouseY < 365){
      numBugs = 15;
      startTime  = millis();
      gameState = "playing";
      setup();
      Tone.Transport.start();
    }
    else if(mouseX > 470 && mouseX < 570 && mouseY > 325 && mouseY < 365){
      numBugs = 20;
      startTime  = millis();
      gameState = "playing";
      setup();
      Tone.Transport.start();
    }
  }else if(gameState == "endL" && mouseX > 345 && mouseX < 445 && mouseY > 325 && mouseY < 365){
    setup();
    gameState = "start";
  }else if(gameState == "endW" && mouseX > 345 && mouseX < 445 && mouseY > 370 && mouseY < 410){
    setup();
    gameState = "start";
  }
}

//this function returns the number of bugs left alive
function getBugsLeft(){
  let bugsAlive = 0;
  for(let i =0; i < bugList.length ; i++){
    if(!bugList[i].dead){bugsAlive++;}
  }
  if(bugsAlive == 0){
    gameState = "endW";
    sounds.player("win").start(0);
    Tone.Transport.stop(0);
    
  }
  return bugsAlive;
}

//Returns the time elapsed since game has started
function timer(){
  return int((millis() - startTime)/1000);
}

//this function checks the time remaining and stops if time expires
function checkTime(){
  if(timer() > 30){
    gameState = "endL";
    sounds.player("lose").start(0);
    Tone.Transport.stop(0);
    
    
  }
}
//This class holds all the information and functions for the bug
class Bug {
  constructor(spriteSheet, x , y, direction){
    this.spriteSheet = spriteSheet;//Spritesheet for bugs
    this.xLoc = x;  //x location of bug
    this.yLoc = y;  //y location of bug
    this.direction = direction; //used to determine the direction the bug is walking(0:left, 1:up, 2:right, 3:down)
    this.walkFrame = 0; //used for indication which frame the bug is in while walking or dead
    this.dead = 0; //Determing if bug is dead
  }

  draw(){
    push();
    translate(this.xLoc, this.yLoc);
    rotate(radians(this.direction * 90));
    //If the bug is not dead
    if(!this.dead){
      image(this.spriteSheet, 0, 0, 100, 100, 300 * this.walkFrame, 0, 300, 300);
      this.walk(random(0,100));
      if(frameCount % 6 == 0){
        this.walkFrame = (this.walkFrame +1) % 4;}
    }else{
      image(this.spriteSheet, 0, 0, 100, 100, 1200, 0, 300, 300);
    }
    pop();
  }

  //This function is used to move the bug
  walk(randomNum){
    if(randomNum>99 && !(this.xLoc > 800 || this.xLoc < 0 || this.yLoc > 800 || this.yLoc < 0)){
      this.direction = Math.floor(random(0, 3.99));
    }
    else if(this.direction == 0){//Left
      if(this.xLoc < -50){
        this.xLoc = 850;
      }else{
      this.xLoc -= 1 * speedMult;
      }

    }else if(this.direction == 1){//Up
      if(this.yLoc < -50){
        this.yLoc = 850;
      }else{
      this.yLoc -= 1 * speedMult;
      }

    }else if(this.direction == 2){//Right
      if(this.xLoc > 850){
        this.xLoc = -50;
      }else{
      this.xLoc += 1 * speedMult;
      }

    }else if(this.direction == 3){//Down
      if(this.yLoc > 850){
        this.yLoc = -50;
      }else{
      this.yLoc += 1 * speedMult;
      }
    }
  }

  //This function checks if the mouse is over a bug and kills it if it is
  checkSquish(){
    sounds.player("strike").start(0);
    if(mouseX > this.xLoc -45 && mouseX < this.xLoc + 45 && mouseY > this.yLoc -45 && mouseY < this.yLoc + 45){
      if(!this.dead){
        sounds.player(Math.floor(random(0, 2.99))).start(); //Plays squish sound when kiling bug
        this.dead = 1;
        if(getBugsLeft == 1){
          
        }
        if(Tone.Transport.bpm.value <= 180){//cap on transport bpm
          Tone.Transport.bpm.value += 4;
        }
        if(speedMult <= 10){//Setting a cap on the speed of the bugs
          speedMult += 0.5;
        }
      }
    }
  }


}
