//Nikolai Leday CSC 2463, Final Integration Project
var vol = new Tone.Volume(-10).toDestination();
const sounds = new Tone.Players({
  "rocketHit" : "https://nleday1212.github.io/CSC2463/Final_Project/sounds/rocketHit.wav",
  "rocketLaser" : "https://nleday1212.github.io/CSC2463/Final_Project/sounds/rocketLaser.wav",
  "alienHit" : "https://nleday1212.github.io/CSC2463/Final_Project/sounds/alienHit.wav",
  "alienLaser" : "https://nleday1212.github.io/CSC2463/Final_Project/sounds/alienLaser.wav",
  "asteroidHit" : "https://nleday1212.github.io/CSC2463/Final_Project/sounds/asteroidHit.wav",
  "beep" : "https://nleday1212.github.io/CSC2463/Final_Project/sounds/beep.wav"
}).connect(vol);
let synth = new Tone.DuoSynth().connect(vol);
let seq = new Tone.Sequence((time, note) =>{
  synth.triggerAttackRelease(note, .01, time);
}, [["D4", "D4"],"D4","D4", "F3", "C4", ["A3", "A3"],"A3","A3", "F3", "C4",
    "D4", "C4", "D4", "C4", "F3", "C4", ["D4", "D4"], "C4", ["F4", "F4" ],"F3"]).start(0);
Tone.Transport.bpm.value = 80;

function preload(){
  background = loadImage("https://nleday1212.github.io/CSC2463/Final_Project/images/spaceBG.png");
  rocketSprite = loadImage("https://nleday1212.github.io/CSC2463/Final_Project/images/rocket.png");
  asteroidSprite = loadImage("https://nleday1212.github.io/CSC2463/Final_Project/images/asteroid.png");
  alienSprite = loadImage("https://nleday1212.github.io/CSC2463/Final_Project/images/alien.png");
  heart = loadImage("https://nleday1212.github.io/CSC2463/Final_Project/images/heart.png");

}

function setup(){
  createCanvas(windowWidth, windowHeight-4);
  game = new Game();
  ui = new userInterface();
}

function draw(){
  //These two if and image lines control the scrolling background
  if(ui.bg1 > windowWidth){ui.bg1 = 0 - windowWidth;}
  if(ui.bg2 > windowWidth){ui.bg2 = 0 - windowWidth;}
  image(background, ui.bg1++, 0, windowWidth , windowHeight-4);
  image(background, ui.bg2++, 0, windowWidth , windowHeight-4);

  if(game.gameState == "mainMenu"){
    ui.drawMainMenu();
  }
  else if(game.gameState == "playing"){
    game.run(); 
    ui.drawPlaying();
  }
  else if(game.gameState == "end"){
    ui.drawEnd();
  };
}

function keyReleased(){
  game.rocket.frame = 0;
}

class userInterface{
  constructor(){
    this.titleSize = 80;
    this.titleGrow = 1;
    this.bg1 = 0;
    this.bg2 = 0 - windowWidth;
  }
  drawMainMenu(){
    if(this.titleSize > 90){
      this.titleGrow = -1;
    }else if(this.titleSize < 80){
      this.titleGrow = 1;
    }
    if(frameCount % 4 == 0){
      this.titleSize += this.titleGrow;
    }
    if(keyIsDown(32)){
      Tone.Transport.start();
      game.gameState = "playing";
      game.gameStartFrame = frameCount;
    }
    rectMode(CENTER);
    fill(128,130,153);
    rect(windowWidth/2, windowHeight/2, 900, 500, 20);
    fill(90,0,180);
    textAlign(CENTER);
    textSize(this.titleSize);
    text("SPACE SPELUNKER", windowWidth/2, windowHeight/2 - 100);
    textSize(20);
    fill(0);
    text("Controls:\nUp Arrow: Move Forward\nLeft Arrow: Turn Left\nRight Arrow: Turn Right\nSpacebar: Boost\nF: Fire Lasers", windowWidth /2 - 300, windowHeight/2 + 100);
    image(asteroidSprite, windowWidth /2 - 75, windowHeight/2 +75, 70, 70, 110 , 0, 100, 100);
    image(asteroidSprite, windowWidth /2 + 25, windowHeight/2 +75, 70, 70, 220 , 0, 100, 100);
    image(asteroidSprite, windowWidth /2 + 125, windowHeight/2 +75, 70, 70, 330, 0, 100, 100);
    image(asteroidSprite, windowWidth /2 + 225, windowHeight/2 +75, 70, 70, 440, 0, 100, 100);
    image(alienSprite, windowWidth /2 + 225, windowHeight/2 +75, 70, 70, 0, 0, 100, 100);
    text("Welcome to Space Spelunker, a game by Nikolai Leday. \nGet the highest score possible by shooting asteroids and aliens!", windowWidth/2, windowHeight/2 - 25);
    fill(220, 0, 0);
    textSize(30);
    text("Start by pressing spacebar!", windowWidth/2, windowHeight/2 + 45);
    textSize(18);
    textAlign(LEFT);
    text("100 Points\t\t200 Points\t\t300 Points\t\t300 Points", windowWidth/2 - 85, windowHeight/2+175);

  }
  drawPlaying(){
    if(frameCount % 180 == 0){Tone.Transport.bpm.value++;}
    push();
    imageMode(CENTER);
    fill(255);
    textSize(40);
    text("Score: " + game.score, 25, 40);
    text("Time : " + Math.floor(61 - (frameCount - game.gameStartFrame)/60), 25, 80);
    if(game.rocket.lives >= 2){
      image(heart, windowWidth/2 - 100, 35, 75, 75);
    }
    if(game.rocket.lives >= 1){
      image(heart, windowWidth/2, 35, 75, 75);
    }
    if(game.rocket.lives >= 3){
      image(heart, windowWidth/2 + 100, 35, 75, 75);
    }
    pop();
  }
  drawEnd(){
    if(this.titleSize > 90){
      this.titleGrow = -1;
    }else if(this.titleSize < 80){
      this.titleGrow = 1;
    }
    if(frameCount % 4 == 0){
      this.titleSize += this.titleGrow;
    }
    rectMode(CENTER);
    fill(128,130,153);
    rect(windowWidth/2, windowHeight/2, 900, 500, 20);
    fill(90,0,180);
    textAlign(CENTER);
    textSize(this.titleSize);
    text("GAME OVER", windowWidth/2, windowHeight/2 - 100);
    textSize(30);
    fill(0);
    text("Score: " + game.score, windowWidth/2, windowHeight/2);
    text("Asteroids Destroyed: " + game.asteroidsDestroyedCount, windowWidth/2, windowHeight/2 + 50);
    text("Aliens killed: " + game.alienKillCount, windowWidth/2, windowHeight/2 +100);
    fill(220, 0, 0);
    text("Press 'F' to return to main menu.", windowWidth/2, windowHeight/2 + 150);
    if(keyIsDown(70)){
      game.gameState = "mainMenu";
      game = new Game();
      Tone.Transport.bpm.value = 80;
    }
  }
}

class Game{
  constructor(){
    this.gameState = "mainMenu";
    this.score = 0;
    this.rocket = new rocketShip(windowWidth /2, windowHeight /2);
    this.asteroids = [];
    this.asteroidsDestroyedCount = 0;
    this.aliens = [];
    this.alienKillCount = 0;
    this.gameStartFrame;
  }
  //This function controls the gamestate and everything running in the game
  run(){
    this.rocket.run();
    this.eventSchedule();
    this.moveEntities();
    this.collisionCheck(this.rocket.xPos, this.rocket.yPos);

    if(this.rocket.lasers.length > 0){
      for(let i = 0; i <= this.rocket.lasers.length -1; i++){
        this.laserCollisionCheck(this.rocket.lasers[i]);
      }
      for(let i = 0; i <= this.aliens.length -1; i++){
        this.alienLaserCollisionCheck(this.aliens[i]);
      }
    }
    if(this.rocket.lives <= 0 || frameCount - this.gameStartFrame > 3600){
      this.gameState = "end";
      Tone.Transport.bpm.value = 80;
    }
  }

  //This function is prescheduled for events to happen, such as creating asteroids and aliens.
  eventSchedule(){
    //Spawning 0 point asteroids
    if(frameCount - this.gameStartFrame < 20){
      this.asteroids.push(new asteroid(-49, random(0, windowHeight-50), random(0, 359), random(0.5, 2), 0));
    }
    //Spawning 0 point asteroid and alien every 5 seconds
    if(frameCount % 300 == 0){
      this.asteroids.push(new asteroid(-49, random(0, windowHeight-50), random(0, 359), random(0.5, 2), 0));
      this.aliens.push(new alien(-49, random(0, windowHeight-50), random(0, 359), 1.5))
    }
    //Spawning 100 Point asteroids every 8 seconds
    if(frameCount % 480 == 0){
      this.asteroids.push(new asteroid(-49, random(0, windowHeight-50), random(0, 359), random(0.5, 2), 1));
    }
    //Spawning 200 Point asteroids every 10 seconds
    if(frameCount % 600 == 0){
      this.asteroids.push(new asteroid(-49, random(0, windowHeight-50), random(0, 359), random(0.5, 2), 2));
    }
    //Spawning 300 Point asteroids every 12 seconds
    if(frameCount % 720 == 0){
      this.asteroids.push(new asteroid(-49, random(0, windowHeight-50), random(0, 359), random(0.5, 2), 3));
    }
    if((frameCount - this.gameStartFrame)/60 == 50){sounds.player("beep").start();}
    if((frameCount - this.gameStartFrame)/60 == 57){sounds.player("beep").start();}
    if((frameCount - this.gameStartFrame)/60 == 58){sounds.player("beep").start();}
    if((frameCount - this.gameStartFrame)/60 == 59){sounds.player("beep").start();}
  }

  //This function calls each function of every entity to move it
  moveEntities(){
    for(let i = 0; i <= this.asteroids.length-1; i++){
      this.asteroids[i].move();
    }
    for(let i = 0; i <= this.aliens.length-1; i++){
      this.aliens[i].move();
    }
  }
  //This functions check to see if the rocket has collided with any objects and removes health if so
  collisionCheck(rocketX, rocketY){
    //Checking asteroid collision with player
    for(let i = 0; i <= this.asteroids.length -1; i++){
      if(rocketX > this.asteroids[i].xPos -60 && rocketX < this.asteroids[i].xPos + 60 && rocketY > this.asteroids[i].yPos -60 && rocketY < this.asteroids[i].yPos + 60){
        if(frameCount - this.rocket.lastCollisionFrame > 90){
          sounds.player("rocketHit").start();
          this.rocket.lives--;
          this.rocket.lastCollisionFrame = frameCount;
        }
      }
    }
    //Checking alien collision with player
    for(let i = 0; i <= this.aliens.length -1; i++){
      if(rocketX > this.aliens[i].xPos -60 && rocketX < this.aliens[i].xPos + 60 && rocketY > this.aliens[i].yPos -60 && rocketY < this.aliens[i].yPos + 60){
        if(frameCount - this.rocket.lastCollisionFrame > 90){
          sounds.player("rocketHit").start();
          this.rocket.lives--;
          this.rocket.lastCollisionFrame = frameCount;
        }
      }
    }
  }
  //This function is passed a laser object and checks if it collides with every asteroid or alien
  laserCollisionCheck(laser){
    for(let i = 0; i< this.asteroids.length ; i++){
      if(laser.xPos > this.asteroids[i].xPos -35 && laser.xPos < this.asteroids[i].xPos + 35 && laser.yPos > this.asteroids[i].yPos -35 && laser.yPos < this.asteroids[i].yPos + 35){
          game.score += this.asteroids[i].type * 100;
          sounds.player("asteroidHit").start();
          this.asteroids.splice(i, 1);
          this.asteroidsDestroyedCount++;
          this.rocket.lasers.splice(this.rocket.lasers.indexOf(laser), 1); //removes laser after it destorys asteroid
          return;
        
      }
    }
    for(let i = 0; i< this.aliens.length ; i++){
      if(laser.xPos > this.aliens[i].xPos -35 && laser.xPos < this.aliens[i].xPos + 35 && laser.yPos > this.aliens[i].yPos -35 && laser.yPos < this.aliens[i].yPos + 35){
          game.score += 300;
          sounds.player("alienHit").start();
          this.aliens.splice(i, 1);
          this.alienKillCount++;
          this.rocket.lasers.splice(this.rocket.lasers.indexOf(laser), 1); //removes laser after it destorys asteroid
          return;
        
      }
    }
  }

  //This function is passed an alien object and checks every if every laser collides with the player
  alienLaserCollisionCheck(alien){
    for(let i = 0; i <= alien.lasers.length - 1; i++){
      if(alien.lasers[i].xPos > this.rocket.xPos - 45 && alien.lasers[i].xPos < this.rocket.xPos + 45 && alien.lasers[i].yPos > this.rocket.yPos -45 && alien.lasers[i].yPos < this.rocket.yPos + 45){
        if(frameCount - this.rocket.lastCollisionFrame > 90){
          sounds.player("rocketHit").start();
          this.rocket.lives--;
          this.rocket.lastCollisionFrame = frameCount;
          alien.lasers.splice(i, 1);
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
    this.lastCollisionFrame = 300;
    this.lives = 3;

  }
  //This function runs the rocket ship
  run(){
    
    this.move();
    for(let i = 0; i < this.lasers.length; i++){this.lasers[i].move();}//Drawing lasers
    if(keyIsDown(70) && (frameCount - this.lastFiredFrame) > 30){
      sounds.player("rocketLaser").start();
      this.lastFiredFrame = frameCount;
      this.lasers.push(new laser(this.xPos, this.yPos, this.angle, "rocket", 8));
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
    rotate(radians(this.angle));
    image(rocketSprite, 0, 0, 100, 100, this.frame * 70, 0, 70,70);
    pop();
  }

  
  

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
    if(this.xPos <= 50 || this.xPos >= windowWidth -50 || this.yPos <= 50 || this.yPos >= windowHeight -50){
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
  constructor(xPos, yPos, angle, source, speed){
    this.angle = angle;
    this.xPos = xPos +  Math.cos((this.angle-90) * Math.PI / 180) * (75);
    this.yPos = yPos + Math.sin((this.angle-90) * Math.PI / 180) * (75);
    this.source = source;
    this.speed = speed;
    
  }
  
  move(){
    this.xPos += Math.cos((this.angle-90) * Math.PI / 180) * (this.speed);
    this.yPos += Math.sin((this.angle-90) * Math.PI / 180) * (this.speed);
    this.draw();
  }
  draw(){
    push();
    translate(this.xPos, this.yPos);
    rotate(radians(this.angle));
    if(this.source == "rocket"){
      strokeWeight(0.3);
      fill(255, 0, 0);
      rect(0, 0, 4, 35, 20);
    }else{
      strokeWeight(0.6);
      fill(0, 255, 0);
      circle(0, 0, 20)
    }
    pop();
  }
  
}

class asteroid{
  constructor(xPos, yPos, angle, speed, type){
    this.xPos = xPos;
    this.yPos = yPos;
    this.angle = angle;
    this.rotateAngle = random(0, 359);
    this.spriteSheet = asteroidSprite;
    this.type = type;
    this.speed = speed;
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
    this.xPos += Math.cos((this.angle-90) * Math.PI / 180) * (this.speed);
    this.yPos += Math.sin((this.angle-90) * Math.PI / 180) * (this.speed);
    this.draw();
  }

  draw(){
    push();
    translate(this.xPos, this.yPos);
    rotate(radians(this.rotateAngle));
    imageMode(CENTER);
    image(this.spriteSheet, 0, 0, 70, 70, 110 * this.type, 0, 100, 100);
    pop();
  }

  
}

class alien{
  constructor(xPos, yPos, angle, speed){
    this.xPos = xPos;
    this.yPos = yPos;
    this.angle = angle;
    this.rotateAngle = 0;
    this.spriteSheet = alienSprite;
    this.frame = 0;
    this.speed = speed;
    this.lasers = [];
    this.lastFiredFrame = frameCount;
  }

  move(){
    for(let i = 0; i < this.lasers.length; i++){this.lasers[i].move();}//Drawing lasers
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
    this.xPos += Math.cos((this.angle-90) * Math.PI / 180) * (this.speed);
    this.yPos += Math.sin((this.angle-90) * Math.PI / 180) * (this.speed);
    this.checkRange(game.rocket.xPos, game.rocket.yPos);
    this.draw();
  }

  draw(){
    if(frameCount % 6 ==0){
      this.frame++;
      if(this.frame > 3){
        this.frame = 0;
      }
    }
    push();
    translate(this.xPos, this.yPos);
    rotate(radians(this.rotateAngle));
    imageMode(CENTER);
    image(this.spriteSheet, 0, 0, 85, 85, 110 * this.frame, 0, 100, 100);
    pop();
  }

  checkRange(rocketX, rocketY){
    if(this.xPos > rocketX -600 && this.xPos < rocketX + 600 && this.yPos > rocketY -600 && this.yPos < rocketY + 600){
      this.faceRocket(rocketX, rocketY);
      this.shootLaser();
    }
  }
  
  faceRocket(rocketX, rocketY){
    this.rotateAngle = (Math.atan2(rocketY - this.yPos, rocketX - this.xPos) * 180/Math.PI) + 90;
  }

  shootLaser(){
    if(frameCount - this.lastFiredFrame > 90){
      this.lasers.push(new laser(this.xPos, this.yPos, this.rotateAngle, "alien", 1));
      sounds.player("alienLaser").start();
      this.lastFiredFrame = frameCount;
      if(this.lasers.length > 10){
        this.lasers.shift();
      }
    }
  }
}