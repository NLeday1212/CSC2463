//Nikolai Leday CSC 2463 Sound Synthesis and Sound Effects 
var trumpetOn = 0;

function preload(){
  background = loadImage("comet.jpg");
}

function setup(){
  createCanvas(800, 525);
  
}

function draw(){
  push();
  background(background, 0,0);
  pop();
}

function mousePressed(){
  trumpetOn = 1;
  

}

function mouseReleased(){
  trumpetOn = 0;

}