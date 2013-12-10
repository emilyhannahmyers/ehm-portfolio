//Bouncing BALLZ
//Emily Myers, August 5th, 2010

// [it's ARRAY TIME!!!] (And declaring universal variables)
Ball ballz[]; //CHANGE NAME!
int numBallz = 100;
int dim = 500;
float accel = .07;

void setup() {
  colorMode(HSB); //Sets the color mode
  noStroke(); //Eliminates lines
  size(500, 500); //Sets the size of the screen

  ballz = new Ball[numBallz];
  for (int i = 0; i<numBallz; i++) {
    ballz[i] = new Ball(random(width), random(height),
    color(random(255), random(200, 255), random(50, 200)));
  }
}

//Calls the needed functions to create the ball
void draw() {
  background(150, 230, 255);
  for (int i = 0; i<numBallz; i++) {
    ballz[i].fall();
    
    if((ballz[i].x > 500 && ballz[i].xVel > 0) 
      || (ballz[i].x < 0 && ballz[i].xVel < 0)) {
      ballz[i].xBounce(); 
    }
    
    if((ballz[i].y > 500 && ballz[i].yVel > 0) 
      || (ballz[i].y < 0 && ballz[i].yVel < 0)) {
      ballz[i].yBounce(); 
    }
    
    ballz[i].show();
  }
}

void keyPressed() {
  if(key==CODED) {
    if(keyCode==UP) {
      for(int i = 0; i<numBallz; i++) {
        ballz[i].xAcc = 0;
        ballz[i].yAcc = -accel;
      }
    }
    if(keyCode==DOWN) {
      for(int i = 0; i<numBallz; i++) {
        ballz[i].xAcc = 0;
        ballz[i].yAcc = accel;
      }
    }
    if(keyCode==LEFT) {
      for(int i = 0; i<numBallz; i++) {
        ballz[i].xAcc = -accel;
        ballz[i].yAcc = 0;
      } 
    }
    if(keyCode==RIGHT) {
      for(int i = 0; i<numBallz; i++) {
        ballz[i].xAcc = accel;
        ballz[i].yAcc = 0;
      } 
    }
  }
}
