//Nikolai Leday CSC 2463, 3.4 Controller
//Youtube link: https://www.youtube.com/watch?v=OFIzX5ssqQw
#include "PDMSerial.h"
PDMSerial pdm;

const int analogX = A0; //Analog X axis input 
const int analogY = A1; //Analog Y axis input
const int button = 7; //Button on joystick 
const int ledPin = 2;     //digital led output


void setup() {
  pinMode(analogX, INPUT);
  pinMode(analogY, INPUT);
  pinMode(button, INPUT);
  pinMode(ledPin, OUTPUT);
  digitalWrite(ledPin, LOW);
  digitalWrite(button, HIGH);
  Serial.begin(9600);

}

void loop() {
  pdm.transmitSensor("hammerX", analogRead(analogX));
  pdm.transmitSensor("hammerY",analogRead(analogY));
  pdm.transmitSensor("button",digitalRead(button));
  pdm.transmitSensor("end");

  boolean newData = pdm.checkSerial();
  if(newData) {
    if(pdm.getName().equals(String("led"))) {
      digitalWrite(ledPin, HIGH);
      delay(100);
      digitalWrite(ledPin, LOW);
      delay(100);
      digitalWrite(ledPin, HIGH);
      delay(100);
      digitalWrite(ledPin, LOW);
      delay(100);
    }
  }

}
