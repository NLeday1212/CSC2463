//Nikolai Leday CSC 2463, 3.4 Controller
//Youtube link: 
#include "PDMSerial.h"
PDMSerial pdm;

const int analogPin = A0; //Analog input 
const int ledPin = 7;     //digital led output
int potentValue;          //value the potentiometer is at

void setup() {
  pinMode(analogPin, INPUT);
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);

}

void loop() {
  potentValue = map(analogRead(analogPin), 0, 1023, 1023, 0);
  pdm.transmitSensor("a0", potentValue);
  pdm.transmitSensor("end");

  boolean newData = pdm.checkSerial();
  if(newData) {
    if(pdm.getName().equals(String("led"))) {
      digitalWrite(ledPin, pdm.getValue());
    }
  }

}
