function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255, 255, 255);
  
  noStroke();
  fill(255, 0,0, 100);
  circle(300, 210, 300)
  
  fill(0, 255,0, 100);
  circle(400, 390, 300)

  fill(0, 0,255, 100);
  circle(200, 390, 300)
}