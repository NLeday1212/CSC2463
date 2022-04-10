/*
 * Nikolai Leday CSC 2463 Assignment 9, 3.1 Digital I/O
 * Youtube link: https://www.youtube.com/watch?v=2AdWPE0J1Zs
*/

const int button1Pin = 2;
const int button2Pin = 3;
const int led1Pin = 12;
const int led2Pin = 11;
const int led3Pin = 10;

int button1State = 0;
int button2State = 0;

void setup() {
  pinMode(button1Pin, INPUT); //Button 1
  pinMode(button2Pin, INPUT); //Button 2
  pinMode(led1Pin, OUTPUT); //LED 1
  pinMode(led2Pin, OUTPUT); //LED 2
  pinMode(led3Pin, OUTPUT); //LED 3
  Serial.begin(9600);
}

void loop() {
  button1State = digitalRead(button1Pin); //Getting value if button is pressed
  button2State = digitalRead(button2Pin);
  if(button1State == HIGH && button2State == HIGH){ //If both buttons pressed
    digitalWrite(led1Pin, HIGH);
    digitalWrite(led2Pin, LOW);
    digitalWrite(led3Pin, LOW);
    delay(500);
    digitalWrite(led1Pin, LOW);
    digitalWrite(led2Pin, HIGH);
    digitalWrite(led3Pin, LOW);
    delay(500);
    digitalWrite(led1Pin, LOW);
    digitalWrite(led2Pin, LOW);
    digitalWrite(led3Pin, HIGH);
    delay(500);
  }else if (button1State == HIGH) { //If first button is pressed
    digitalWrite(led1Pin, HIGH);
    delay(350);
    digitalWrite(led1Pin, LOW);
    delay(350);
  }
  else if(button2State == HIGH){ //If second button is pressed
    digitalWrite(led2Pin, HIGH);
    digitalWrite(led3Pin, LOW);
    delay(150);
    digitalWrite(led2Pin, LOW);
    digitalWrite(led3Pin, HIGH);
    delay(150);
  }else{
    digitalWrite(led1Pin, LOW);
    digitalWrite(led2Pin, LOW);
    digitalWrite(led3Pin, LOW);
  }

}
