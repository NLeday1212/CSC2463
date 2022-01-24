function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(0, 0, 125);

  //white circle
  noStroke();
  fill(255, 255, 255);
  circle(400,400,400);
  
  //green circle
  fill(0, 100, 0);
  circle(400,400,380);

  //white star
  fill(255, 255, 255);
  beginShape();
  vertex(400, 190);//top
  vertex(450, 350);
  vertex(605, 350);//right
  vertex(475, 425);
  vertex(520, 570);//bot right
  vertex(400, 480);//inside middle
  vertex(280, 570);//bot left
  vertex(325, 425);
  vertex(195, 350);//left
  vertex(350, 350);
  endShape();

  //red star
  fill(255, 0, 0);
  beginShape();
  vertex(400, 220);//top
  vertex(440, 360);
  vertex(575, 360);//right
  vertex(460, 420);
  vertex(505, 550);//bot right
  vertex(400, 470);//inside middle
  vertex(295, 550);//bot left
  vertex(340, 420);
  vertex(225, 360);//left
  vertex(360, 360);
  endShape();

}