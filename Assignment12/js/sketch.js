//Nikolai Leday CSC 2463 Assignment 12, 3.4 Controller
//Youtube link: https://www.youtube.com/watch?v=OFIzX5ssqQw
//Variables used for running the game
let background;    //background
let spriteSheet;     //Spritesheet for the bugs
let bugList = [];  //an array of all the bugs on the screen
let numBugs;       //Number of bugs on the screen
let speedMult = 1;//Speed multipler to change speed of bugs
let startTime;
let timeRemaining = 30;
let gameState = "start"; //"Start" game has not started. "playing" game is currently in play. "endL" or "endW" game is over
let hammer;

//Variables used for communication with arduino
let serialPDM;                            
let portName = 'COM3';    
let sensors;

//Setting up the sound with Tone.js
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
  background = loadImage("https://nleday1212.github.io/CSC2463/Assignment12/images/BugBackground.png");
  spriteSheet = loadImage("https://nleday1212.github.io/CSC2463/Assignment12/images/BugSprites.png");
  hammerSprite = loadImage("https://nleday1212.github.io/CSC2463/Assignment12/images/Hammer.png")

  //Next few lines sets up communication with arduino
  serialPDM = new PDMSerial(portName);
  console.log(serialPDM.inData);
  sensors = serialPDM.sensorData;
}

function setup() {
  createCanvas(800, 800);
  speedMult = 1;
  hammer = new Hammer(hammerSprite, millis()); //creating the hammer cursor
  //While loop deletes bug objects from array to account for game restarts. Fixes isse with going down in difficulty
  while(bugList.length > 0){
    bugList.pop();
  }
  //Creates the bug objects
  for(let i =0; i <= numBugs -1; i++){
    let thisBug = new Bug(spriteSheet, random(50, 750), random(50, 750), Math.floor(Math.random() * (3 - 0 + 1)) + 0);
    bugList[i] = thisBug;
  }
  Tone.Transport.bpm.value = 90;
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
  hammer.move(sensors.hammerX, sensors.hammerY);
  if(sensors.button == 0){
    if(millis() - hammer.lastClickTime > 650){
      hammer.click();
      hammer.lastClickTime = millis();
    }
  }
  hammer.draw();
}

//this function returns the number of bugs left alive
function getBugsLeft(){
  let bugsAlive = 0;
  for(let i =0; i < bugList.length ; i++){
    if(!bugList[i].dead){bugsAlive++;}
  }
  if(bugsAlive == 0){
    gameState = "endW";
    Tone.Transport.stop(0);
    sounds.player("win").start(0);
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
    Tone.Transport.stop(0);
    sounds.player("lose").start(0);
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
  checkSquish(x, y){
    if(x > this.xLoc -45 && x < this.xLoc + 45 && y > this.yLoc -45 && y < this.yLoc + 45){
      if(!this.dead){
        sounds.player(Math.floor(random(0, 2.99))).start(); //Plays squish sound when kiling bug
        this.dead = 1;
        serialPDM.transmit('led',0);
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

//This function holds all the information about the hammer/cursor
class Hammer{
  constructor(spriteSheet, time){
    this.spriteSheet = spriteSheet;
    this.xLoc = 400;  //x location of hammer
    this.yLoc = 450;  //y location of hammer
    this.lastClickTime = time; //time of last click by the hammer to space. Used to make the hammer non spammable
  }
  //This function moves the hammer
  move(x, y){
    if(x > 550 && !(this.xLoc > 800)){
      this.xLoc += 5;
    }
    else if(x < 450 && !(this.xLoc < 0)){
      this.xLoc -= 5;
    }
    
    if(y > 550 && !(this.yLoc > 800)){
      this.yLoc += 5;
    }
    else if(y < 450 && !(this.yLoc < 0)){
      this.yLoc -= 5;
    }  
  }
  //This function draws the hammer/cursor onto the screen
  draw(){
    push();
    imageMode(CENTER);
    translate(this.xLoc, this.yLoc);
    if(millis() - this.lastClickTime > 250){
      image(this.spriteSheet, 0, 0, 100, 100, 0, 0, 300, 300);
    }else{
      image(this.spriteSheet, 0, 0, 100, 100, 300, 0, 300, 300);
    }
    
    pop();
  }
  //This function interacts with the game from the click of the joystick
  click(){
    if(gameState == "playing"){
      for(let i =0; i <= bugList.length -1; i++){
        bugList[i].checkSquish(this.xLoc, this.yLoc);
      }
    }else{
      if(this.checkButton(this.xLoc, this.yLoc) == 1){
        numBugs = 3;
        gameState = "playing";
        Tone.Transport.start();
        startTime  = millis();
        setup();
      }else if(this.checkButton(this.xLoc, this.yLoc) == 2){
        numBugs = 6;
        gameState = "playing";
        Tone.Transport.start();
        startTime  = millis();
        setup();
      }else if(this.checkButton(this.xLoc, this.yLoc) == 3){
        numBugs = 10;
        gameState = "playing";
        Tone.Transport.start();
        startTime  = millis();
        setup();
      }else if(this.checkButton(this.xLoc, this.yLoc) == 4){
        gameState = "start";
        Tone.Transport.stop();
        setup();
      }
    }
    sounds.player("strike").start(0);
  }

  //This function checks to see if the hammer/cursor is over a button and returns the corresponding button id number
  checkButton(x, y){
    let retVal = 0;
    if(gameState == "start"){
      if(x >= 220 && x <= 320 && y >= 325 && y <= 365){
        retVal = 1;
      }
      else if(x >= 345 && x <= 445 && y >= 325 && y <= 365){
        retVal = 2;
      }
      else if(x >= 470 && x <= 570 && y >= 325 && y <= 365){
        retVal = 3;
      }
    }
    else if(gameState == "endW"){
      if(x >= 345 && x <= 445 && y >= 370 && y <= 410){
        retVal = 4;
      }
    }else if(gameState == "endL"){
      if(x >= 345 && x <= 445 && y >= 325 && y <= 365){
        retVal = 4;
      }
    }
    return retVal;
  }
}

