//Nikolai Leday CSC 2463 Sampler Assignment 5
const sounds = new Tone.Players({
  eightBit : "sounds/8bit.wav",
  Sonar : "sounds/beep.wav",
  Gunshot : "sounds/gunshot.wav",
  Swoosh : "sounds/swoosh.mp3",
  WOW : "sounds/wow.wav"
})
var vol = new Tone.Volume(-5).toDestination();
var pitch = new Tone.PitchShift();
sounds.connect(pitch);
pitch.connect(vol);

let currSound = "Sonar";
let button1, button2, button3, button4, button5, button6, button7, slider1, slider2, slider3;

function setup() {
  createCanvas(800, 800);
  //Creating buttons to change the current sound
  button1 = createButton("8 Bit", 'eightBit');
  button1.position(35, 400);
  button1.mousePressed(()=>{currSound = "eightBit";})

  button2 = createButton("Sonar", 'sonar');
  button2.position(185, 400);
  button2.mousePressed(()=>{currSound = "Sonar";})

  button3 = createButton("Gunshot", 'gunshot');
  button3.position(335, 400);
  button3.mousePressed(()=>{currSound = "Gunshot";})

  button4 = createButton("Swoosh", 'swoosh');
  button4.position(485, 400);
  button4.mousePressed(()=>{currSound = "Swoosh";})

  button5 = createButton("WOW", 'wow');
  button5.position(635, 400);
  button5.mousePressed(()=>{currSound = "WOW";})

  //Play button
  button6 = createButton("Play Sound", 'play');
  button6.style('width', '175px');
  button6.position(310, 225);
  button6.mousePressed(()=>{sounds.player(currSound).start();})//Starts the player when the play button is pressed

  //Creating option sliders and checkboxes
  slider1 = createSlider(-40, 10, -5, 1);
  slider1.class('slider');
  slider1.position(50, 600);

  slider2 = createSlider(.1, 2, 1, .01);
  slider2.class('slider');
  slider2.position(300, 600);

  slider3 = createSlider(-20, 20, 0, 1);
  slider3.class('slider');
  slider3.position(550, 600);
}

function draw(){
  //Constantly updating and controling players output values to change effects while audio is playing
  vol.volume.value = slider1.value();                                                   ///
  sounds.player(currSound).playbackRate = slider2.value();                             ///
  pitch.pitch = slider3.value();                                                      ///
  //////////////////////////////////////////////////////////////////////////////////////
  push();
  //Drawing Project info
  background(7, 185, 87);
  textSize(18);
  textAlign(LEFT);
  text("Nikolai Leday, CSC 2463, Assignment 5, Sampler", 5, 20);

  //Drawing currently selected sound and telling how to use
  textSize(80);
  textAlign(CENTER);
  fill(255);
  if(currSound != "eightBit"){text(currSound, 400, 150); }
  else{ text("8 Bit", 400, 150);}
  textSize(30);
  text("Select a sound and options:", 400, 375)
  textAlign(LEFT);
  textSize(25);
  text("Volume \t\t\t\t\t\t\t\t\t Playback Rate \t\t\t\t\t\t\t\t Pitch", 105, 590);
  pop();
}

