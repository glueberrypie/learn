let lines = [];
let colors = ["#7209b7", "#3a0ca3", "#4361ee", "#4cc9f0", 
"#ef476f", "#ffd166", "#06d6a0", "#118ab2", "#073b4c", "#ffffff"];

let yspeed=0;
let a=1;

function setup() {
  createCanvas(400, 400);
  // colorMode(OVERLAY);
  shuffle(colors, true);
  // tiling();
  // flowField();
  // background(255);
  background(random(colors));
  stroke(255,230);
  
}

function draw() {
  tiling();
  flowField();
  for(let i=0; i<lines.length; i++){
    let x=lines[i][0];
    let y=lines[i][1];
    let len=lines[i][2];
    let ang=lines[i][3];
    let col=color(lines[i][4]);
    col.setAlpha(50);
    push();
    translate(x,y);
    rotate(ang);
    stroke(col);
    line(0,0,0,len);
    pop();
  }

  if(lines.length>1000){
    lines.splice(0,1);
  }
}

function flowField(){
  let num=100;
  let w=width/num;
  for(let i=0; i<=num; i++){
    for(let j=0; j<=num; j++){
      let x=i*w;
      let y=j*w;
      let nScl=0.0004;
      let nStr=noise(x*nScl, y*nScl)*80;
      let ang=noise(x*nScl, y*nScl)*nStr;
      let col=get(x,y);
      let len=random(50);
      lines.push([x,y,len,ang,col]);
    }
  }
}

function tiling(){ 
  noStroke();
  beginShape();
  for(let a=0; a<TWO_PI; a+=0.01){
    let xoff=map(cos(a), -1, 1, 0, 2);
    let yoff=map(sin(a), -1, 1, 0, 2);
    let r=map(noise(xoff, yoff), 0, 1, 50, 100);
    let x=width/2+r*cos(a);
    let y=height/2+r*sin(a)+yspeed;
    let nn=(noise(xoff*0.003, yoff*0.003)*colors.length*2)-2;
    //     // console.log(nn);
        let index=int(constrain(nn, 0, colors.length-1));
        let col=colors[index];
        fill(col);
    vertex(x,y);
  }
  endShape(CLOSE);
  // yspeed+=3;
}

function keyReleased(){
  if(key=='s' || key=='S'){
    save('feather.png');
  }
}