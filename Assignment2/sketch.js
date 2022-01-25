let c = [255, 0, 0]; //default brush color

function setup() {
  createCanvas(840, 800);
  background(240,240,240);
  //noCursor();
  noStroke();
}

function draw() {
  
  fill(255, 0, 0);//select red
  rect(5,5,40, 40);

  fill(255, 155, 0);//select orange
  rect(5,50,40, 40);

  fill(255, 255, 0);//select yellow
  rect(5,95,40, 40);

  fill(0, 200, 0);//select green
  rect(5,140,40, 40);

  fill(0, 255, 255);//select light blue
  rect(5,185,40, 40);

  fill(0, 0, 255);//select dark blue
  rect(5,230,40, 40);

  fill(255, 50, 255);//select pink
  rect(5,275,40, 40);

  fill(100, 50, 0);//select brown
  rect(5,320,40, 40);

  fill(255, 255, 255);//select white
  rect(5,365,40, 40);

  fill(0, 0, 0);//select black
  rect(5,410,40, 40);

  
  if(mouseIsPressed && mouseX > 50 || (mouseX < 50 && mouseY > 460)){
    fill(c);
    ellipse(mouseX, mouseY, 20,20);
  }else if(mouseIsPressed && mouseX > 5 && mouseX < 45 && mouseY > 5 && mouseY <45){
    c = [255, 0, 0];//red
  }else if(mouseIsPressed && mouseX > 5 && mouseX < 45 && mouseY > 50 && mouseY <90){
    c = [255, 155, 0];//orange
  }else if(mouseIsPressed && mouseX > 5 && mouseX < 45 && mouseY > 95 && mouseY <135){
    c = [255, 255, 0];//yellow
  }else if(mouseIsPressed && mouseX > 5 && mouseX < 45 && mouseY > 140 && mouseY <180){
    c = [0, 200, 0];//green
  }else if(mouseIsPressed && mouseX > 5 && mouseX < 45 && mouseY > 185 && mouseY <225){
    c = [0, 255, 255];//light blue
  }else if(mouseIsPressed && mouseX > 5 && mouseX < 45 && mouseY > 230 && mouseY <270){
    c = [0, 0, 255];//dark blue
  }else if(mouseIsPressed && mouseX > 5 && mouseX < 45 && mouseY > 275 && mouseY <315){
    c = [255, 50, 255];//pink
  }else if(mouseIsPressed && mouseX > 5 && mouseX < 45 && mouseY > 320 && mouseY <360){
    c = [100, 50, 0];//brown
  }else if(mouseIsPressed && mouseX > 5 && mouseX < 45 && mouseY > 365 && mouseY <400){
    c = [255, 255, 255];//white
  }else if(mouseIsPressed && mouseX > 5 && mouseX < 45 && mouseY > 410 && mouseY <450){
    c = [0,0,0];//black
  }

  
  
}