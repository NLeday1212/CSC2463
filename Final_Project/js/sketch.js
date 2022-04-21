//Nikolai Leday CSC 2463, Final Integration Project
let background;
let rocket;

function preload(){
  background = loadImage("https://nleday1212.github.io/CSC2463/Final_Project/images/spaceBG.png");
  rocketSprite = loadImage("https://nleday1212.github.io/CSC2463/Final_Project/images/rocket.png");
}

function setup(){
  createCanvas(windowWidth, windowHeight-4);
  rocket = new rocketShip(400, 400);
}

function draw(){
  //image(background, 0, 0, 1920 , windowHeight-4);
  fill(255);
  textSize(20);
  image(background, 0, 0, windowWidth, windowHeight, rocket.xPos -50, rocket.yPos - 50, 300, 300)
  rocket.draw();
  rocket.move();


  text("X: ", 25, 25);
  text(rocket.xPos, 45, 25);
  text("Y: ", 25, 50);
  text(rocket.yPos, 45, 50);
}

function keyReleased(){
  rocket.frame = 0;
}

class Game{
  constructor(gameState){
    this.gameState = "mainMenu";
  }
}

class rocketShip{
  constructor(xPos, yPos){
    this.xPos = xPos;
    this.yPos = yPos;
    this.angle = 0;
    this.spriteSheet = rocketSprite;
    this.frame = 0;
    this.lives = 3;

  }
  draw(){
    push();
    imageMode(CENTER);
    translate(windowWidth/2, windowHeight/2);
    rotate(radians(this.angle));
    image(rocketSprite, 0, 0, 100, 100, this.frame * 70, 0, 70,70);
    pop();
  }
  move(){
    let up = 0;
    let left = 0;
    let right = 0;
    if(keyIsDown(UP_ARROW)){up = 1;}
    if(keyIsDown(LEFT_ARROW)){left = 1;}
    if(keyIsDown(RIGHT_ARROW)){right = 1;}

    //This if turns the ship around if beyond boundary
    if(this.xPos <= 50 || this.xPos >= windowWidth - 50 || this.yPos <= 50 || this.yPos >= windowHeight - 50){
      this.angle += 180;
    }
    //Moving forward and/or roating left/right
    if(up){
      if(frameCount % 4 == 0){
        this.frame = (this.frame +1) % 4;
      }
      this.xPos += Math.cos((this.angle-90) * Math.PI / 180) * 4;
      this.yPos += Math.sin((this.angle-90) * Math.PI / 180) * 4;
      if(up && left){
        rocket.angle-= 2;
      }else if(up && right){
        rocket.angle+= 2;
      }
      if(this.frame == 0){this.frame++;}
    }
    else if(right){//Rotating Left
      rocket.angle+= 4;
    }else if(left){//Rotating Right
      rocket.angle-= 4;
    }
    
  }
}