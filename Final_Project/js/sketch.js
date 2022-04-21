//Nikolai Leday CSC 2463, Final Integration Project
let game;

function preload(){
  background = loadImage("https://nleday1212.github.io/CSC2463/Final_Project/images/spaceBG.png");
  rocketSprite = loadImage("https://nleday1212.github.io/CSC2463/Final_Project/images/rocket.png");
}

function setup(){
  createCanvas(windowWidth, windowHeight-4);
  game = new Game();
}

function draw(){
  image(background, 0, 0, windowWidth , windowHeight-4);
  //INTENDED FINAL LINES REMOVE ABOVE//image(background, 0, 0, windowWidth, windowHeight, rocket.xPos -50, rocket.yPos - 50, 100, 100)
  drawUI();
  game.run(); 
  
  
}

function drawUI(){
  push();
  textAlign(CENTER);
  textSize(90);
  text("SPACE SPELUNKER", windowWidth/2, windowHeight/2);
  pop();


  fill(255);
  textSize(20);
  text("X: " + game.rocket.xPos, 25, 25);
  text("Y: " + game.rocket.yPos, 25, 50);
  text("Lives: " + game.rocket.lives, 25, 75);
}

function keyReleased(){
  game.rocket.frame = 0;
}

class Game{
  constructor(){
    this.gameState = "mainMenu";
    this.rocket = new rocketShip(400, 400);
    this.asteroids = [];
    for(let i = 0; i <= 25; i++){
      this.asteroids.push(new asteroid(random(1, windowWidth), random(1, windowHeight), random(0, 359)));
    }
  }
  //This function controls the gamestate and everything running in the game
  run(){
    this.rocket.run();
    for(let i = 0; i <= this.asteroids.length-1; i++){
      this.asteroids[i].move();
    }
    this.collisionCheck(this.rocket.xPos, this.rocket.yPos);
  }

  //This functions check to see if the rocket has collided with any objects
  collisionCheck(rocketX, rocketY){
    for(let i = 0; i <= this.asteroids.length -1; i++){
      if(rocketX > this.asteroids[i].xPos -60 && rocketX < this.asteroids[i].xPos + 60 && rocketY > this.asteroids[i].yPos -60 && rocketY < this.asteroids[i].yPos + 60){
        if(frameCount - this.rocket.lastCollisionTime > 90){
          this.rocket.lives--;
          this.rocket.lastCollisionTime = frameCount;
        }
      }
    }
  }
}

class rocketShip{
  constructor(xPos, yPos){
    this.xPos = xPos;
    this.yPos = yPos;
    this.angle = 0;
    this.spriteSheet = rocketSprite;
    this.frame = 0;
    this.speed = 2;
    this.lasers = [];
    this.lastFiredFrame = 0;
    this.lastCollisionTime = frameCount;
    this.lives = 3;

  }
  run(){
    
    this.move();
    for(let i = 0; i < this.lasers.length; i++){this.lasers[i].move();}
    if(keyIsDown(70) && (frameCount - this.lastFiredFrame) > 30){
      this.lastFiredFrame = frameCount;
      this.lasers.push(new laser(this.xPos, this.yPos, this.angle));
      if(this.lasers.length > 10){
        this.lasers.shift();
      }
    }
    this.draw(); 
  }

  draw(){
    push();
    imageMode(CENTER);
    translate(this.xPos, this.yPos);
    //INTENDED FINAL LINES REMOVE ABOVE//translate(windowWidth/2, windowHeight/2);
    rotate(radians(this.angle));
    image(rocketSprite, 0, 0, 100, 100, this.frame * 70, 0, 70,70);
    pop();
  }

  //This function runs the rocket ship
  

  move(){
    let up = 0;
    let left = 0;
    let right = 0;
    let boost = 0;
    if(keyIsDown(UP_ARROW)){up = 1;}
    if(keyIsDown(LEFT_ARROW)){left = 1;}
    if(keyIsDown(RIGHT_ARROW)){right = 1;}
    if(keyIsDown(32)){boost = 3;}
    

    //This if turns the ship around if beyond boundary
    if(this.xPos <= 100 || this.xPos >= windowWidth - 100 || this.yPos <= 100 || this.yPos >= windowHeight - 100){
      this.angle += 180;
    }
    //Moving forward and/or roating left/right
    if(up){
      //this if is changing frames
      if(frameCount % 4 == 0){
        this.frame = (this.frame +1) % 4;
      }
      this.xPos += Math.cos((this.angle-90) * Math.PI / 180) * (this.speed + boost);
      this.yPos += Math.sin((this.angle-90) * Math.PI / 180) * (this.speed + boost);
      if(up && left){
        this.angle-= 2;
      }else if(up && right){
        this.angle+= 2;
      }
      if(this.frame == 0){this.frame++;}
    }
    else if(right){//Rotating Left
      this.angle+= 3;
    }else if(left){//Rotating Right
      this.angle-= 3;
    }
    
  }
  
}

class laser{
  constructor(xPos, yPos, angle){
    this.angle = angle;
    this.xPos = xPos +  Math.cos((this.angle-90) * Math.PI / 180) * (75);
    this.yPos = yPos + Math.sin((this.angle-90) * Math.PI / 180) * (75);
    
  }
  
  move(){
    this.xPos += Math.cos((this.angle-90) * Math.PI / 180) * (4);
    this.yPos += Math.sin((this.angle-90) * Math.PI / 180) * (4);
    this.draw();
  }
  draw(){
    push();
    translate(this.xPos, this.yPos);
    rotate(radians(this.angle));
    strokeWeight(0.3);
    fill(255, 0, 0);
    rect(0, 0, 4, 35, 20);
    pop();
  }
  
}

class asteroid{
  constructor(xPos, yPos, angle, spriteSheet){
    this.xPos = xPos;
    this.yPos = yPos;
    this.angle = angle;
    this.rotateAngle = random(0, 359);
    this.spriteSheet = spriteSheet;
  }

  move(){
    this.rotateAngle += 0.5;
    if(this.xPos < -50){
      this.xPos = windowWidth + 49;
    }else if(this.xPos > windowWidth + 50){
      this.xPos = -49;
    }
    if(this.yPos < -50){
      this.yPos = windowHeight + 49;
    }else if(this.yPos > windowHeight + 50){
      this.yPos = -49;
    }
    this.xPos += Math.cos((this.angle-90) * Math.PI / 180) * (0.5);
    this.yPos += Math.sin((this.angle-90) * Math.PI / 180) * (0.5);
    this.draw();
  }

  draw(){
    push();
    translate(this.xPos, this.yPos);
    rotate(radians(this.rotateAngle));
    strokeWeight(0.3);
    fill(139, 70, 20);
    rect(0, 0, 40, 40);
    pop();
  }
}