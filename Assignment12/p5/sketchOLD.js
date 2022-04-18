//Nikolai Leday CSC 2463, 3.3 Serial Communication
let serialPDM;                            
let portName = 'COM3';    
let sensors;
let ledState = "Off";
let bgColor = "White";
let txtColor = "Black";

function setup() {
  serialPDM = new PDMSerial(portName);
  console.log(serialPDM.inData);
  sensors = serialPDM.sensorData;
  
  createCanvas(1024,600);
}

function draw(){
  setBackground();
  background(bgColor);
  drawColorBox();
  circle(sensors.a0, 340, 40); 
  push();
  textSize(32);
  fill(txtColor);
  text("analog value: "+ sensors.a0, 10, 30);
  text("led state: " + ledState, 10, 70);
  pop();
}

function keyPressed() {
  serialPDM.transmit('led',1);
  ledState = "On";
  console.log(serialPDM.sensorsConnected());
}

function keyReleased() {
  serialPDM.transmit('led',0);  
  ledState = "Off";
}

//This function sets the background color depending on the potentiometer value
function setBackground(){
  if(sensors.a0 <= 128){
    bgColor = "White";
    txtColor = "Black";
  }else if(sensors.a0 > 128 && sensors.a0 <= 256){
    bgColor = "Red";
    txtColor = "Black";
  }else if(sensors.a0 > 256 && sensors.a0 <= 384){
    bgColor = "Orange";
    txtColor = "Black";
  }else if(sensors.a0 > 384 && sensors.a0 <= 512){
    bgColor = "Yellow";
    txtColor = "Black";
  }else if(sensors.a0 > 512 && sensors.a0 <= 640){
    bgColor = "Green";
    txtColor = "Black";
  }else if(sensors.a0 > 640 && sensors.a0 <= 768){
    bgColor = "Blue";
    txtColor = "Black";
  }else if(sensors.a0 > 768 && sensors.a0 <= 896){
    bgColor = "Purple";
    txtColor = "Black";
  }else if(sensors.a0 > 896){
    bgColor = "Black";
    txtColor = "White";
  }
}

//This functions draws the 8 different colored boxes to help visualize the color zones
function drawColorBox(){
  push();
  fill("White");
  rect(0, 300, 128, 75);
  fill("Red");
  rect(128, 300, 128, 75);
  fill("Orange");
  rect(256, 300, 128, 75);
  fill("Yellow");
  rect(384, 300, 128, 75);
  fill("Green");
  rect(512, 300, 128, 75);
  fill("Blue");
  rect(640, 300, 128, 75);
  fill("Purple");
  rect(768, 300, 128, 75);
  fill("Black");
  rect(896, 300, 128, 75);
  pop();
}