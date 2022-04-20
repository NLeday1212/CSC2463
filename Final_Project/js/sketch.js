//Nikolai Leday CSC 2463, Final Integration Project
let background;
let rocket;

function preload(){
  background = loadImage("https://nleday1212.github.io/CSC2463/Final_Project/images/spaceBG.png");
  
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  rocket = new rocketShip(400, 400);
}

function draw(){
  image(background, 0, 0, windowWidth -1 , windowHeight -1);
  rocket.draw();
}

class Game{
  constructor(gameState){
    this.gameState = 0;
  }
}


class rocketShip{
  constructor(xPos, yPos){
    this.xPos = xPos;
    this.yPos = yPos;
    this.lives = 3;

  }
  draw(){
    push();
    translate(this.xPos, this.yPos);
    fill(255);
    square(100,100, 100, 100);
    pop();
  }
}