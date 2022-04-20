//Nikolai Leday CSC 2463, Final Integration Project

function preload(){
  let background = loadImage("http://localhost:8080/Final_Project/images/spaceBG.jpg");

}

function setup(){
  createCanvas(windowWidth, windowHeight);

}

function draw(){
  image(background, windowWidth, windowHeight );
  fill(255);
  text(windowWidth, 40, 40);
}

class Game{
  constructor(gameState){
    this.gameState = 0;
  }
}

class entity{
  constructor(xPos, yPos, type){
    this.xPos = xPos;
    this.yPos = yPos;
    this.entityType = type;
  }
}