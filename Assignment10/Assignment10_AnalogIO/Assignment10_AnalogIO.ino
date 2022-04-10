/*
 * Nikolai Leday CSC 2463 Assignment 10, 3.2 Analog I/O
 * Youtube link: https://www.youtube.com/watch?v=9-xUqffi6-c
*/


const int SW_pin = 2; //Switch button on joystick
const int X_pin = 0; //x analog on joystick
const int Y_pin = 1; //y analog on joystick        
const int led1_pin = 11; //led1 pin
const int led2_pin = 10; //led2 pin

int led1Bright = 0; //Brightness levels for the analog led's from 0-255
int led2Bright = 0; 

int X_level = 0; //Levels can go from 0-510, with 255 being brightest, and 0 and 510 being dimmest/off
int Y_level = 0;

int gameState = 0; //Controls the state the game is in 0 being player 1's turn, 1 being player 2's turn, 2 being endgame showing which player has won

int p1X = 0; //Player 1's x level for determing a winner
int p1Y = 0; //Player 1's y level
int p2X = 0;
int p2Y = 0;

int p1Score = 0;//Used for calculating a winner 
int p2Score = 0;

void setup()  {  
  pinMode(led1_pin, OUTPUT);
  pinMode(led2_pin, OUTPUT);
  pinMode(SW_pin, INPUT);
  digitalWrite(SW_pin, HIGH);
  Serial.begin(9600);
} 

void loop() {
 //this if statement is for switching game modes and reseting values
 if(digitalRead(SW_pin) == 0){
  delay(1000);
  if(gameState < 2){
    if(gameState == 0){
      p1X = X_level;
      p1Y = Y_level;
    }
    else if(gameState == 1){
      p2X = X_level;
      p2Y = Y_level;
    }
    gameState ++;
    X_level = 0;
    Y_level = 0;
    led1Bright = 0;
    led2Bright = 0;
    analogWrite(led1_pin, 0);
    analogWrite(led2_pin, 0);
  }else{
    gameState = 0;
  }
 }
 if(gameState == 0 || gameState == 1){
    //These next if else statements read input from the joystick and changes values accordingly
    if(analogRead(X_pin) >= 510){//Joystick right
      X_level += 10; 
    }else if(analogRead(X_pin) <= 490){//Joystick left
      X_level -= 10;
    }
    if(analogRead(Y_pin) <= 490){//Joystick up
      Y_level += 10; 
    }else if(analogRead(Y_pin) >= 510){//Joystick down
      Y_level -= 10;
    }
    //////////////////////////////////////////////////////////////////////////////////////////
 
    //These next four if statements caps the levels the brightness can go to 
    if(X_level > 510){X_level = 510;} 
    if(X_level < 0){X_level = 0;}
    if(Y_level > 510){Y_level = 510;}
    if(Y_level < 0){Y_level = 0;}
    ////////////////////////////////////////////////////////////////////////

    //These next if else statements sets the brightness levels accordingly
    if(X_level <= 255){
     led1Bright = X_level;
    }else{
     led1Bright = 255 - (X_level - 255);
    }
    if(Y_level <= 255){
      led2Bright = Y_level;
    }else{
      led2Bright = 255 - (Y_level - 255);
    }
    //////////////////////////////////////////////////////////////////////
    analogWrite(led1_pin, led1Bright);
    analogWrite(led2_pin, led2Bright);
  }//if gameState = 0 | 1
  else{//This if statement is for the endgame state displaying which player has won
    if(calculateWinner() == 0){
      analogWrite(led1_pin, 255);
      delay(500);
      analogWrite(led1_pin, 0);
      delay(500);
    }else if(calculateWinner() == 1){
      analogWrite(led2_pin, 255);
      delay(500);
      analogWrite(led2_pin, 0);
      delay(500);
    }else{
      analogWrite(led1_pin, 255);
      analogWrite(led2_pin, 255);
      delay(500);
      analogWrite(led1_pin, 0);
      analogWrite(led2_pin, 0);
      delay(500);
    }
  }
 delay(100);
}

//This function calculates the winner with the lower score being better
int calculateWinner(){
  p1Score = 0;
  p2Score = 0;
  
  if(p1X <= 255){
    p1Score += 255 - p1X;  
  }
  else{
    p1Score += p1X -255; 
  }
  
  if(p1Y <= 255){
    p1Score += 255 - p1Y;  
  }
  else{
    p1Score += p1Y -255;
  }

  if(p2X <= 255){
    p2Score += 255 - p2X;  
  }
  else{
    p2Score += p2X -255;
  }

  if(p2Y <= 255){
    p2Score += 255 - p2Y;  
  }
  else{
    p2Score += p2Y - 255;
  }

  if(p1Score < p2Score){
    return 0;
  }else if(p2Score < p1Score){
    return 1;
  }else{
    return 2;
  }
  
}
