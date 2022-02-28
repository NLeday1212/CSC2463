//Nikolai Leday CSC 2463 Synth Assignment 6
//Creating synths one for every key
synth = new Tone.Synth().toDestination();

let currKey = '0'; //This variable is responsible for highlighting which key is presed

function setup() {
  createCanvas(1000, 800);
  //Volume Slider
  slider1 = createSlider(-40, 5, -5, 1);
  slider1.class('slider');
  slider1.position(600, 200);

  //Synthesizer mode selection
  selectMode = createSelect();
  selectMode.position(225, 200);
  selectMode.option('Default');
  selectMode.option('Membrane');
  selectMode.option('Mono');
  selectMode.option('Metal');
  selectMode.id('select');
  selectMode.changed(()=>{changeSynth(document.getElementById('select').value);});

}

function draw(){
  //Changing values from sliders and buttons
  synth.volume.value = slider1.value();
  if(synth.volume.value <= -39){synth.volume.value = -100;}
  
  push();
  //Drawing Basic info
  background(230, 166, 245);
  textSize(18);
  textAlign(LEFT);
  text("Nikolai Leday, CSC 2463, Assignment 6, Synths and Sequencers", 5, 20);
  textSize(30);
  text("Synthesizer Mode: \t\t\t\t\t\t\t\t\t\t Volume", 215, 180);


  //Drawing Keys
  fill(230, 166, 245);
  strokeWeight(6);
  square(20, 600, 65, 10);
  square(120, 600, 65, 10);
  square(220, 600, 65, 10);
  square(320, 600, 65, 10);
  square(420, 600, 65, 10);
  square(520, 600, 65, 10);
  square(620, 600, 65, 10);
  square(720, 600, 65, 10);
  square(820, 600, 65, 10);
  square(920, 600, 65, 10);
  fill(0,0,0);
  textAlign(CENTER);
  textSize(48);
  if(currKey == 'q'){fill(255,255,255);}
  text("Q", 52, 650);
  fill(0,0,0);
  if(currKey == 'w'){fill(255,255,255);}
  text("W", 152, 650);
  fill(0,0,0);
  if(currKey == 'e'){fill(255,255,255);}
  text("E", 252, 650);
  fill(0,0,0);
  if(currKey == 'r'){fill(255,255,255);}
  text("R", 352, 650);
  fill(0,0,0);
  if(currKey == 't'){fill(255,255,255);}
  text("T", 452, 650);
  fill(0,0,0);
  if(currKey == 'y'){fill(255,255,255);}
  text("Y", 552, 650);
  fill(0,0,0);
  if(currKey == 'u'){fill(255,255,255);}
  text("U", 652, 650);
  fill(0,0,0);
  if(currKey == 'i'){fill(255,255,255);}
  text("I", 752, 650);
  fill(0,0,0);
  if(currKey == 'o'){fill(255,255,255);}
  text("O", 852, 650);
  fill(0,0,0);
  if(currKey == 'p'){fill(255,255,255);}
  text("P", 952, 650);
  fill(0,0,0);
  pop();
}

function keyPressed(){
  if(keyCode === 81){//Q
    synth.triggerAttack("C4");
    currKey = 'q';
  }
  if(keyCode === 87){//W
    synth.triggerAttack("D4");
    currKey = 'w';
  }
  if(keyCode === 69){//E
    synth.triggerAttack("E4");
    currKey = 'e';
  }
  if(keyCode === 82){//R
    synth.triggerAttack("F4");
    currKey = 'r';
  }
  if(keyCode === 84){//T
    synth.triggerAttack("G4");
    currKey = 't';
  }
  if(keyCode === 89){//Y
    synth.triggerAttack("A4");
    currKey = 'y';
  }
  if(keyCode === 85){//U
    synth.triggerAttack("B4");
    currKey = 'u';
  }
  if(keyCode === 73){//I
    synth.triggerAttack("C5");
    currKey = 'i';
  }
  if(keyCode === 79){//O
    synth.triggerAttack("D5");
    currKey = 'o';
  }
  if(keyCode === 80){//P
    synth.triggerAttack("E5");
    currKey = 'p';
  }
}

function keyReleased(){
  synth.triggerRelease();
  currKey = '0';
}

//This function changes the synthesizer
function changeSynth(mode){
  switch(mode){
    case 'Membrane' :
      synth = new Tone.MembraneSynth().toDestination();
      break;
    case 'Metal' :
      synth = new Tone.MetalSynth().toDestination();
      break;
    case 'Mono' :
      synth = new Tone.MonoSynth().toDestination();
      break;
    default : 
    synth = new Tone.Synth().toDestination();
      break;
    
  }
}
