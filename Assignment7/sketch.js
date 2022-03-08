
//Nikolai Leday CSC 2463 Sound Synthesis and Sound Effects 
const autoPanner = new Tone.AutoPanner("50n").toDestination().start();
const oscillator = new Tone.Oscillator().connect(autoPanner).start();
const noise = new Tone.Noise("brown").connect(autoPanner);


function preload(){
  comet = loadImage("https://nleday1212.github.io/CSC2463/Assignment7/comet.jpg");
}

function setup(){
  createCanvas(800, 525);
  
}

function draw(){
  push();
  background(comet, 0,0);
  textSize(18);
  textAlign(LEFT);
  fill(255);
  text("Nikolai Leday, CSC 2463, Assignment 7, Sound Synthesis & Sound Effects\nPress mouse in space and drag towards Earth!", 5, 20);
  if(mouseY >= 320 && mouseIsPressed){
    noise.start();
    autoPanner.stop();
    oscillator.stop();
  }

  pop();
}

function mousePressed(){
  Tone.start();
}

