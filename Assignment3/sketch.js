let backgroundImg; //The image for the background
let character1;    //The character 1 object
let character2;

function preload(){
backgroundImg = loadImage("https://nleday1212.github.io/CSC2463/Assignment3/background.png");
goldMan = loadImage("https://nleday1212.github.io/CSC2463/Assignment3/goldMan.png");
roundBoy = loadImage("https://nleday1212.github.io/CSC2463/Assignment3/roundBoy.png");

}

function setup() {
  createCanvas(900, 500);
  let randomX = Math.floor(Math.random() * (800 - 100 + 1) + 100);
  let randomY = Math.floor(Math.random() * (400 - 250 + 1) + 250);
  character1 = new Character(goldMan, randomX, randomY); //Creates a new character object
  randomX = Math.floor(Math.random() * (800 - 100 + 1) + 100);
  randomY = Math.floor(Math.random() * (400 - 250 + 1) + 250);
  character2 = new Character(roundBoy, randomX, randomY); //Creates a new character object

}

function draw(){
  image(backgroundImg, 0, 0, 900, 500);
  textSize(24);
  text('Press left and right arrow keys to move golden man.\nPress up and down arrow keys to move round boy.', 200, 50);
  push();
  imageMode(CENTER);
  //This if and else statement is used accurately draw one character over the other based on the randomly
  //generated x and y location
  if(character1.yLoc > character2.yLoc){
    character2.draw();
    character1.draw();
  }else{
    character1.draw();
    character2.draw();
  }
  pop();
}

//This function makes the character calls the walk function to make the character walk left or right
function keyPressed(){
  if (keyCode == RIGHT_ARROW){
    character1.walk(1);
  }
  else if(keyCode == LEFT_ARROW){
    character1.walk(-1);
  }
  if (keyCode == UP_ARROW){
    character2.walk(1);
  }
  else if(keyCode == DOWN_ARROW){
    character2.walk(-1);
  }
}

//This function makes the character stop walking
function keyReleased(){
  if(character1.walking != 0){
    character1.stop();
  }
  if(character2.walking != 0){
    character2.stop();
  }
}


//This class holds all the information and functions for the character to walk
class Character {
  constructor(spriteSheet,x , y){
    this.spriteSheet = spriteSheet; 
    this.xLoc = x;  //x location of character
    this.yLoc = y;  //y location of character
    this.walking = 0;  //used to determin if the character is actively walking
    this.direction = 1; //used to determine the direction the character is facing
    this.walkFrame = 0; //used for indication which frame the character is in while walking or standing
  }

  draw(){
    push();
    translate(this.xLoc, this.yLoc);
    scale(this.direction, 1);

    //If the character is not walking, the first image in the sprite sheet will be used 
    if(this.walking == 0){
      image(this.spriteSheet, 0, 0, 150, 150, 0, 0, 80, 80);
    }
    else {
      image(this.spriteSheet, 0, 0, 150, 150, (this.walkFrame + 1 )* 80, 0, 80, 80);
    }

    if(frameCount % 5 == 0){
      this.walkFrame = (this.walkFrame +1) % 8;
    }
    this.xLoc += this.walking * 2.5;
    pop();
  }

  //This function is used to set the walking state and walking direction appropriately
  walk(direction){
    this.walking = direction;
    this.direction = direction;
  }

  //This function makes the character stop walking
  stop(){
    this.walking = 0;
  }
}
