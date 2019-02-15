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

function drawHouse(x,y,w,h,style1,style2) {
  canvas.fillStyle = style1||'white';
  canvas.fillRect(x,y+h/2,w,h/2);
  canvas.fillTriangle(x+-w/10,y+h/2+1,w+w*2/10,-h/2);
  canvas.fillStyle = style2||'black';
  canvas.fillRect(x+w*.6,y+h/2+h/6,w/4,h*2/6);
  canvas.fillRect(x+w*.2,y+h/2+h/6,w/5,h/6);
}
function drawBox(x,y,w,h,style1,style2) {
  canvas.fillStyle = style1||'brown';
  canvas.fillRect(x,y,w,h);
  canvas.fillStyle = style2||'brown';
  canvas.fillRect(x+w*.6,y+h/2+h/6,w/4,h*2/6);
  canvas.fillRect(x+w*.2,y+h/2+h/6,w/5,h/6);
}

class Thing {
  constructor() {
    this.scale = 1;
    this.angle = 0;
  }
  update() {}
  draw() {
    const {x,y,w,h} = this;
    canvas.save();
    canvas.translate(x,y);
    canvas.scale(this.scale,this.scale);
    canvas.rotate(this.angle);
    canvas.translate(-w/2,-h/2);
    this.drawShape(0,0,w,h,this.color);
    canvas.restore();
  }
}

class Clickable extends Thing{
  constructor(x,y) {
    super();
    this.x=x;
    this.y=y;
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
}

class HouseButton extends Clickable {
  constructor(x,y) {
    super(x,y);
    this.w=50;
    this.h=60;
    // this.drawShape=drawHouse;
    this.d = 100;
  }
  update() {
    this.d += (0-this.d)/50;
    // if(this.d>0)
    // this.d-=1;
    if(touchOn) this.clicked();
    super.update();
  }
  clicked() {
    this.shouldDelete = true;
    if(spawnLevel==1){
        window.test = new Mover(this.x,this.y);

    }
    else{
    	window.test = new Mover(this.x,this.y, coinCount);
    }
    entities.push(test);
    mouse.down = false;
    SOUNDS.start.play();
    started = true;
    frameCount=0;
  }
  drawShape(x,y,w,h,style1,style2) {
    var d = this.d;
    canvas.fillStyle = style1||'white';
    canvas.fillRect(x,y+h/2+d,w,h/2);
    canvas.fillTriangle(x+-w/10,y+h/2+1-d,w+w*2/10,-h/2);
    canvas.fillStyle = style2||'black';
    canvas.fillRect(x+w*.6,y+h/2+h/6+d*2,w/4,h*2/6);
    canvas.fillRect(x+w*.2,y+h/2+h/6+d*3,w/5,h/6);
  }
}

function getAxes() {
  if(touchOn&&touchJoySticks[0].held) {
    return {
      inputX: touchJoySticks[0].output.x,
      inputY: touchJoySticks[0].output.y,
    }
  }
  var inputX = (keys[68]||keys[39])-(keys[65]||keys[37]);
  var inputY = (keys[83]||keys[40])-(keys[87]||keys[38]);
  return {inputX, inputY};
}



class Coin extends Thing {
  constructor(x,y,angle,r) {
    super();
    this.x=x;
    this.y=y;
    this.w = 25;
    this.h = 30;
    this.color = 'gold';
    this.drawShape = drawHouse;
    this._w = this.w;
    this.frame = Math.floor(Math.random()*10);
    this.vx = Math.cos(angle)*r*3;
    this.vy = Math.sin(angle)*r*3;
    this.vz = -4+Math.random();
    this.z = 0;
    this.falling = true;
  }
  update() {
    if(this.falling) {
      this.vz += 0.3;
      this.x += this.vx;
      this.y += this.vy+this.vz;
      this.z+=this.vz;
      if(this.z>0) {
        this.falling = false;
        SOUNDS.coin.play();
      }
    }
    this.frame += 1;
    this.animate();
    if(collides(this,player)) {
      this.pickup();
      this.shouldDelete = true;
    }

    if(this.x<0)this.x=0;
    if(this.x>CE.width)this.x=CE.width;
    if(this.y<0)this.y=0;
    if(this.y>CE.height)this.y=CE.height;
  }
  animate() {
    this.w = this._w * Math.cos(this.frame*Math.PI/20);
  }
  pickup() {
    player.coins += 1;
    SOUNDS.coin.play();
  }
}

class Health extends Coin {
  constructor(x,y,angle,r) {
    super(x,y,angle,r);
    this.color = '#f99';
  }
  animate() {
    this.y += Math.cos(this.frame*Math.PI/20);
  }
  pickup() {
    lifeBlink=1;
    player.life += 5;
    SOUNDS.health.play();
    if(player.life>player.maxLife)player.life = player.maxLife;
  }
}

function collides(a,b) {
  return a.x+a.w/2>=b.x-b.w/2 &&
    a.x-a.w/2<=b.x+b.w/2 &&
    a.y+a.h/2>=b.y-b.h/2 &&
    a.y-a.h/2<=b.y+b.h/2;
}

var entities = [];
var enemies = [];
var playerBullets = [];
var mouse = {x:0,y:0,down:false,held:false};
var frameCount = 0;
var keys = [];
var started = 0;
var player;
var weapons = [];
weapons.default = {
  speed: 10,
  color: '#fff',
}
weapons.shotgun = {
  speed: 20,
  color: '#0ff',
  shoot: function(x,y,angle) {
    entities.push()
  }
}
for(var i=0;i<255;++i)keys[i]=0;

function spawnEnemy() {
  if(spawnCount==-1)return;
  spawnCount += 1;
  var r = CE.width/2;
  if(spawnCount>40)r=r/2;
  var angle = Math.random()*Math.PI*2;
  var x = Math.cos(angle)*r+CE.width/2;
  var y = Math.sin(angle)*r+CE.height/2;
  if(spawnCount<30)
    entities.push(new Enemy(x,y));
  else if(spawnCount==30){
    spawnTime = 350;
  }
  else if(spawnCount<40) {
    spawnTime = 70;
    entities.push(new BigEnemy(x,y));
  } else if(spawnCount == 40) {
    spawnTime = 500;
  } else {
	  if(spawnLevel == 1){
    entities.push(new boxBoss(x,y));
    spawnCount = -1;
	  }
	  else if(spawnLevel == 2){
	entities.push(new HouseBoss(x,y))
	spawnCount = -1
	  }
	  else if(spawnLevel == 3){
	entities.push(new mansionBoss(x,y))
	  }
  }
}

var spawnCount;

function update() {
  spawnTimer += 1;
  if(spawnTimer>=spawnTime&&started) {
    spawnEnemy();
    spawnTimer = 0;
  }
  for(var i=0;i<entities.length;++i) {
    var e = entities[i];
    e.update();
    if(e.shouldDelete) {
      entities.splice(i,1);
      --i;
    }
  }
  for(var i=0;i<playerBullets.length;++i) {
    var b = playerBullets[i];
    if(b.shouldDelete) {
      playerBullets.splice(i,1);
      --i;
      continue;
    }
    for(var j=0;j<enemies.length;++j) {
      var e = enemies[j];
      if(e.shouldDelete) {
        enemies.splice(j,1);
        --j;
        continue;
      }
      if(collides(b,e)) {
        e.hit();
        b.hit();
        break;
      }
    }
  }
  if(started==1) {
    if(player.life<=0) {
      started = 2;
      frameCount = 0;
    }
  }
// THIS IS WHERE EVERYTHING ENDS
  if(started==2&&frameCount>100){
    canvas.globalAlpha = 1;
    spawnLevel +=1
    window.coinCount = test.coins
    if(spawnLevel==4){
    	start(1)
    }
    else{
    	start(spawnLevel);
    }
  }
  if(spawnCount==-1&&enemies.length==0) {
    win=true;
  }
  mouse.down=false;
  frameCount+=1;

}
function draw() {
  canvas.clearRect(0,0,CE.width,CE.height);
  if(started==2) canvas.globalAlpha = 1-frameCount/100;
  entities.forEach(e=>e.draw());
  window.requestAnimationFrame(draw);
  if(started) {
    if(spawnCount==-1 && enemies.length ==0) {
      canvas.fillStyle = 'white';
      canvas.textAlign='center';
      canvas.font = "60px Impact";
      canvas.strokeStyle = 'black';
      canvas.lineWidth = 2;
      canvas.strokeText("HOUSE", CE.width/2,CE.height/2);
      canvas.fillText("HOUSE", CE.width/2,CE.height/2);
      if(entities.length == 1&&started!=2) {
        started = 2;
        frameCount = 0;
      }
    }
    canvas.save();
    if(frameCount<100)
    canvas.translate(0,-100+frameCount);
    canvas.font = '20px Gloria Hallelujah, Cursive';
    canvas.textAlign = 'left';
    canvas.fillStyle = '#e12';
    if(lifeBlink>0) {
      if(lifeBlink%10<5)
      canvas.fillStyle = '#f88';
      lifeBlink+=1;
      if(lifeBlink>20)lifeBlink=0;
    }
    canvas.fillText('House', 10,40);
    // for(var i=0;i<player.life;++i) {
    //   drawHouse(80+25/2+i*100/player.maxLife,20,30,40,'red','red');
    // }
    var color = canvas.fillStyle;
    drawHouse(80,20,100,30,'#333','#333');
    drawHouse(80,20,100* player.life/player.maxLife,30,color,color);
    // canvas.fillRect(80,20,100* player.life/player.maxLife,30) ;


    if(frameCount<200)
    canvas.translate(-200+frameCount,0);
    canvas.fillStyle = 'gold';
    canvas.font = '20px Pacifico'
    canvas.fillText('House: '+player.coins, 10,80);
    canvas.restore();
  }
  if(touchOn) {
    touchDraw();
  }
}

function touchDraw() {
  for(var i=0;i<touchJoySticks.length;++i) {
    var joyStick = touchJoySticks[i];
    var angle = joyStick.output.angle;
    var w = joyStick.r*CE.height;
    var h = w*60/50;
    canvas.save();
    canvas.translate(joyStick.x*CE.width, joyStick.y*CE.height);
    canvas.rotate(angle+Math.PI/2);
    var color = 'rgba(255,255,255,0.5)';
    if(joyStick.held)color = 'rgba(255,0,0,0.5)';
    drawHouse(-w/2,-h/2,w,h,color,'rgba(0,0,0,0.1)');
    canvas.restore();
  }
}
var lifeBlink;
var win;
function start(level) {
  entities = [];
  enemies = [];
  playerBullets = [];
  spawnCount = 0;
  spawnTime = 50;
  spawnLevel = level;
  spawnTimer = 0;
  frameCount = 0;
  lifeBlink = 0;
  touchOn = false;
  win = false;
  started = false;
  entities.push(new HouseButton(CE.width/2,CE.height/2));
}
function setup() {
  setInterval(update, 1000/60);
  draw();
  start(1);
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
  mouse.held = true;
  initializeSound();
}

function onmouseup(e) {
  mouse.held = false;
}

function onkeydown(e) {
  var k = e.keyCode;
  keys[k]=true;
}

function onkeyup(e) {
  var k = e.keyCode;
  keys[k]=false;
}

window.addEventListener('resize', onresize);
window.addEventListener('load', onresize);
window.addEventListener('load', setup);
window.addEventListener('mousemove', onmousemove);
window.addEventListener('mousedown', onmousedown);
window.addEventListener('mouseup', onmouseup);
window.addEventListener('keydown', onkeydown);
window.addEventListener('keyup', onkeyup);
