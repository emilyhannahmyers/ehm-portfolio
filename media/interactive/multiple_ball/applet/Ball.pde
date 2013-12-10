class Ball { //Declaring class properties
  float x;
  float y;
  color col;

  float xVel;
  float yVel;
  float xAcc = 0;
  float yAcc = accel;

  Ball(float xPos, float yPos, color myColor) {
    x = xPos;
    y = yPos;
    col = myColor;
  }

  void fall() { //Equations to make the ball fall
    x += xVel;
    xVel += xAcc;
    y += yVel;
    yVel += yAcc;
  }

  void show() { //...to show the ball
    fill(col);
    ellipse(x, y, 20, 20);
  }

  void xBounce() {
    xVel *= .9;
    xVel = -xVel;
  }

  void yBounce() { //...and to bounce the ball
    yVel *= .9;
    yVel = -yVel;
  }
}






