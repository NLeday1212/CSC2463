//Nikolai Leday CSC 2463 Sound Synthesis and Sound Effects 
const tremolo = new Tone.Tremolo(6, 0.75).toDestination().start();
const autoPanner = new Tone.AutoPanner("50n").connect(tremolo).start();
const oscillator = new Tone.Oscillator().connect(autoPanner).start();
const noise = new Tone.Noise("brown").connect(autoPanner);
noise.fadeOut = 2;
let exploded = 0;

function preload(){
  comet = loadImage("https://nleday1212.github.io/CSC2463/Assignment7/comet.jpg");
  explosion = loadImage("https://nleday1212.github.io/CSC2463/Assignment7/explosion.jpg");
  backgroundImg = comet;
}

function setup(){
  createCanvas(800, 525);
}

function draw(){
  push();
  background(backgroundImg, 0,0, 800, 525);
  textSize(18);
  textAlign(LEFT);
  fill(255);
  text("Nikolai Leday, CSC 2463, Assignment 7, Sound Synthesis & Sound Effects\nPress mouse in space and drag towards Earth quickly!", 5, 20);
  console.log(mouseY);
  if(mouseY >= 320 && mouseIsPressed){
    backgroundImg = explosion;
    noise.start();
    autoPanner.stop();
    oscillator.stop();
    noise.stop(1);
  }
  pop();
}

function mousePressed(){
  Tone.start();
}

