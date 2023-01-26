function setup() {
  createCanvas(800, 800);
  colorMode(HSB,360,100,100,100);
  angleMode(DEGREES);
}

function draw() {
  background(0,0,90);

  let x1 = width / 3 + cos(frameCount*3/1)*100;
  let y1 = height / 2 + sin(frameCount*3/1.5)*100;
  let r1 = width / 8 * sin(frameCount) + width/4;
  let c1 = new Circle(x1, y1, r1);

  let x2 = width * 2 / 3 + cos(frameCount*2.5) *100;
  let y2 = height / 2 + sin(frameCount*1.25) *100;
  let r2 = width / 8 * sin(180+frameCount)+width/4;
  let c2 = new Circle(x2, y2, r2);

  c1.display();
  c2.display();

  let  points = Circle.getCirclesCrossPoints(c1, c2);
  if(points != null){
  for(let p of points){
    fill(0,0,100);
    circle(p.x,p.y,30);
  }

    
  }
  // noLoop();
}

class Circle {
  constructor(x, y, r) {
    this.center = createVector(x, y);
    this.r = r;
  }
  display() {
    noFill();
    circle(this.center.x, this.center.y, this.r * 2);
  }
  static getCirclesCrossPoints(c1, c2) {
    let a = 2 * (c2.center.x - c1.center.x);
    let b = 2 * (c2.center.y - c1.center.y);
    let c = sq(c1.center.x) - sq(c2.center.x) + sq(c1.center.y) - sq(c2.center.y) + sq(c2.r) - sq(c1.r);
    return this.getLineCircleCrossPoints(a, b, c, c1.center.x, c1.center.y, c1.r);
  }
  static getLineCircleCrossPoints(a, b, c, circleX, circleY, r) {
    //円の中心から直線までの距離
    //mag(a, b) = √a^2+b^2
    let d = abs((a * circleX + b * circleY + c) / mag(a, b));
    
    //直線の垂線とX軸と平行な線がなす角度θ
    let theta = atan2(b, a);
    if (d > r) {
      return null;
    } else if (d == r) {
      let points = [];
      if (a * circleX + b * circleY + c > 0) theta += 180;

      let crossX = r * cos(theta) + circleX;
      let crossY = r * sin(theta) + circleY;

      point[0] = createVector(crossX, crossY);
      return point;
    } else {
      let crossPoint = [];
      let crossX = [];
      let crossY = [];

      //alphaとbetaの角度を求める
      let alpha, beta, phi;
      phi = acos(d / r);
      alpha = theta - phi;
      beta = theta + phi;

      //場合わけ
      if (a * circleX + b * circleY + c > 0) {
        alpha += 180;
        beta += 180;
      }

      //交点の座標を求める
      crossX[0] = r * cos(alpha) + circleX;
      crossY[0] = r * sin(alpha) + circleY;

      crossX[1] = r * cos(beta) + circleX;
      crossY[1] = r * sin(beta) + circleY;
      
      for (let i = 0; i < crossX.length; i++){        
        crossPoint[i] = createVector(crossX[i], crossY[i]);
      }
      return crossPoint;
    }
  }
}

