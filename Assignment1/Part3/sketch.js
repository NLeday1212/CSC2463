function setup() {
  createCanvas(900, 450);
}

function draw() {
  background(0, 0, 0);
  //making pacman body
  fill(255, 255, 84);
  circle(250, 225, 375)
  
  //pacman mouth
  fill(0,0,0);
  triangle(60,60, 250,230, 60,400);

  //ghost body
  fill(255, 50, 50);
  rect(500, 205, 350, 200);
  noStroke();
  circle(675,205,350);

  //white eyes
  fill(255, 255, 255);
  circle(590, 200, 110);
  circle(760, 200, 110);

  //blue eyes
  fill(50, 85, 255);
  circle(590, 200, 70);
  circle(760, 200, 70);
  
  


}