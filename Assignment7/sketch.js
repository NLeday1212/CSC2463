//Nikolai Leday CSC 2463 Sound Synthesis and Sound Effects 

function preload(){
  trumpet = loadImage("https://nleday1212.github.io/CSC2463/Assignment7/trumpet.png");
}

function setup(){
createCanvas(800, 800);
background(175);
}

function draw(){
imageMode(CENTER);
image(trumpet, 400, 400);
}