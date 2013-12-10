import processing.core.*; 

import java.applet.*; 
import java.awt.Dimension; 
import java.awt.Frame; 
import java.awt.event.MouseEvent; 
import java.awt.event.KeyEvent; 
import java.awt.event.FocusEvent; 
import java.awt.Image; 
import java.io.*; 
import java.net.*; 
import java.text.*; 
import java.util.*; 
import java.util.zip.*; 
import java.util.regex.*; 

public class multiple_ball_bounce extends PApplet {

//Bouncing BALLZ
//Emily Myers, August 5th, 2010

// [it's ARRAY TIME!!!] (And declaring universal variables)
Ball ballz[]; //CHANGE NAME!
int numBallz = 100;
int dim = 500;
float accel = .07f;

public void setup() {
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
public void draw() {
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

public void keyPressed() {
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
class Ball { //Declaring class properties
  float x;
  float y;
  int col;

  float xVel;
  float yVel;
  float xAcc = 0;
  float yAcc = accel;

  Ball(float xPos, float yPos, int myColor) {
    x = xPos;
    y = yPos;
    col = myColor;
  }

  public void fall() { //Equations to make the ball fall
    x += xVel;
    xVel += xAcc;
    y += yVel;
    yVel += yAcc;
  }

  public void show() { //...to show the ball
    fill(col);
    ellipse(x, y, 20, 20);
  }

  public void xBounce() {
    xVel *= .9f;
    xVel = -xVel;
  }

  public void yBounce() { //...and to bounce the ball
    yVel *= .9f;
    yVel = -yVel;
  }
}






  static public void main(String args[]) {
    PApplet.main(new String[] { "--present", "--bgcolor=#666666", "--stop-color=#cccccc", "multiple_ball_bounce" });
  }
}
