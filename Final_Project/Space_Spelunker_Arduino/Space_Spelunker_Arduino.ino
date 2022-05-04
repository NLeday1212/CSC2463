//Nikolai Leday CSC 2463, Final Project
//Youtube link: 
#include "PDMSerial.h"
PDMSerial pdm;

const int analogX = A0; //Analog X axis input 
const int analogY = A1; //Analog Y axis input
const int joyButton = 7; //Button on joystick
const int boostButton = 6; //button input 
const int ledPin1 = 4;     //digital led output
const int ledPin2 = 3;     //digital led output
const int ledPin3 = 2;     //digital led output
int lives = 3;


void setup() {
  pinMode(analogX, INPUT);
  pinMode(analogY, INPUT);
  pinMode(joyButton, INPUT);
  pinMode(boostButton, INPUT);
  pinMode(ledPin1, OUTPUT);
  pinMode(ledPin2, OUTPUT);
  pinMode(ledPin3, OUTPUT);
  
  digitalWrite(ledPin1, HIGH);
  digitalWrite(ledPin2, HIGH);
  digitalWrite(ledPin3, HIGH);
  digitalWrite(joyButton, HIGH);
  Serial.begin(9600);

}

void loop() {
  pdm.transmitSensor("joyX", analogRead(analogX));
  pdm.transmitSensor("joyY",analogRead(analogY));
  pdm.transmitSensor("joyButton",digitalRead(joyButton));
  pdm.transmitSensor("boostButton",digitalRead(boostButton));
  pdm.transmitSensor("end");


  boolean newData = pdm.checkSerial();
  if(newData) {
    if(pdm.getName().equals(String("heal"))) {
      lives = 3;
    }
    if(pdm.getName().equals(String("collision"))) {
      lives--;
    }
    if(lives == 3){
      digitalWrite(ledPin1, HIGH);
      digitalWrite(ledPin2, HIGH);
      digitalWrite(ledPin3, HIGH);
    }else if(lives == 2){
      digitalWrite(ledPin1, HIGH);
      digitalWrite(ledPin2, HIGH);
      digitalWrite(ledPin3, LOW);
    }else if(lives == 1){
      digitalWrite(ledPin1, LOW);
      digitalWrite(ledPin2, HIGH);
      digitalWrite(ledPin3, LOW);
    }else if(lives == 0){
      digitalWrite(ledPin1, LOW);
      digitalWrite(ledPin2, LOW);
      digitalWrite(ledPin3, LOW);
    }
  }

}
