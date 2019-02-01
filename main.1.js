var CE = document.getElementById('gc');
var canvas = CE.getContext('2d');

function onresize(e){
  var rw = window.innerWidth/window.innerHeight;
  var rc = canvas.width/canvas.height;
  if(rw > rc) {
    CE.style.height = "100%";
    CE.style.width = "";
  } else {
    CE.style.width = "100%";
    CE.style.height = "";
  }
}

canvas.triangle = function(x,y,b,h) {
  canvas.moveTo(x,y);
  canvas.lineTo(x+b,y);
  canvas.lineTo(x+b/2,y+h);
  canvas.lineTo(x,y);
}

canvas.fillTriangle = function(x,y,b,h) {
  canvas.beginPath();
  canvas.triangle(x,y,b,h);
  canvas.fill();
}

function drawHouse(x,y,w,h) {
  canvas.fillStyle = 'white';
  canvas.fillRect(x,y+h/2,w,h/2);
  canvas.fillTriangle(x+-w/10,y+h/2+1,w+w*2/10,-h/2);
  canvas.fillStyle = 'black';
  canvas.fillRect(x+w*.6,y+h/2+h/6,w/4,h*2/6);
  canvas.fillRect(x+w*.2,y+h/2+h/6,w/5,h/6);
}

class Clickable {
  constructor(x,y) {
    this.x=x;
    this.y=y;
    this.scale = 1;
    this.angle = 0;
  }
  contains(x,y) {
    return x>=this.x-this.w/2&&x<=this.x+this.w/2&&
      y>=this.y-this.h/2&&y<=this.y+this.h/2;
  }
  moused() {
    return this.contains(mouse.x,mouse.y);
  }
  clicked() {

  }
  update() {
    // this.scale+=0.1;)
    if(this.moused()) {
      this.scale += (1.2-this.scale)/3;
      if(mouse.down) {
        this.clicked();
      }
    } else {
      this.scale += (1-this.scale)/3;
    }
  }
  draw() {
    const {x,y,w,h} = this;
    canvas.save();
    canvas.translate(x,y);
    canvas.scale(this.scale,this.scale);
    canvas.rotate(this.angle);
    canvas.translate(-w/2,-h/2);
    this.drawShape(0,0,w,h);
    canvas.restore();
  }
}

class House extends Clickable {
  constructor(x,y) {
    super(x,y);
    this.w=50;
    this.h=60;
    this.drawShape=drawHouse;
  }
}

class Word extends Clickable {
  constructor(x,y,word) {
    super(x,y);
    this.fontSize = 20;
    this.fontFamily = 'Arial';
    this.w = 100;
    this.h = this.fontSize*1.4;
    this.text = word;
    // this.vx = Math.random()*2-1;
    // this.vy = Math.random()*2-1;
    this.speed = 1;
    this.time=frameCount;
    this.r = 100;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    super.update();
    if(this.selected) {
      var dx = CE.width/2-this.x;
      var dy = CE.height/2-this.y;
      var r = Math.sqrt(dx*dx+dy*dy);
      if(r>this.r) {
        this.vx = dx/r*this.speed;
        this.vy = dy/r*this.speed;
      } else {
        this.vx = 0;
        this.vy = 0;
      }
    }
  }
  clicked() {
    if(this.selected) {
      this.r += (30-this.r)/10;
    } else {
      this.r = 30+(frameCount-this.time)/2
    }
    this.selected = true;
  }
  drawShape(x,y,w,h) {
    canvas.fillStyle = 'white';
    canvas.strokeStyle = 'black';
    canvas.lineWidth = 2;
    canvas.textAlign = 'center';
    canvas.font = this.fontSize+'px '+this.fontFamily;
    canvas.translate(w/2,h*.75);
    canvas.strokeText(this.text,x,y,w,h);
    canvas.fillText(this.text,x,y,w,h);
  }
}

var entities = [];
var mouse = {x:0,y:0,down:false};
var frameCount = 0;

var wordList=[];

function spawnWord() {
  var r = 100;
  var angle = Math.random()*Math.PI*2;
  var x = Math.cos(angle)*r+CE.width/2;
  var y = Math.sin(angle)*r+CE.height/2;
  var word = wordList.splice(Math.floor(Math.random()*wordList.length),1);
  wordObj = new Word(x,y, word);
  wordObj.vx = Math.cos(angle)/10;
  wordObj.vy = Math.sin(angle)/10;
  entities.push(wordObj);
}
function lineParseToList(paragraph) {
  var lines = paragraph.split('\n');
  return lines;
}

function update() {
  if(frameCount%100==20)spawnWord();
  entities.forEach(e=>e.update());
  mouse.down=false;
  frameCount+=1;
}
function draw() {
  canvas.clearRect(0,0,CE.width,CE.height);
  entities.forEach(e=>e.draw());
  window.requestAnimationFrame(draw);
}
function start(){
  entities.push(new House(CE.width/2,CE.height/2));
  wordList = lineParseToList(
    `House
    Love
    Family
    Community
    Protection
    Safety
    Relaxation
    Relief
    Sleep
    Bed
    Food
    Duty
    Responsibility
    Confusion
    Friends
    Childhood
    Work
    Tree
    Pizza
    God
    Religion
    Support
    Doggo
    Kitty
    Cooking
  `);
}
function setup() {
  setInterval(update, 1000/60);
  draw();
  start();
}

function onmousemove(e) {
  var boundingClientRect = e.target.getBoundingClientRect();
  x = e.clientX-boundingClientRect.left;
  y = e.clientY-boundingClientRect.top;
  x *= CE.width/e.target.offsetWidth;
  y *= CE.height/e.target.offsetHeight;
  mouse.x=x;
  mouse.y=y;
}

function onmousedown(e) {
  mouse.down = true;
}

function onmouseup(e) {
  mouse.down = false;
}

window.addEventListener('resize', onresize);
window.addEventListener('load', onresize);
window.addEventListener('load', setup);
window.addEventListener('mousemove', onmousemove);
window.addEventListener('mousedown', onmousedown);
window.addEventListener('mouseup', onmouseup);
