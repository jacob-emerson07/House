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
var limit = 0
var random = 0
var random2 = 0
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
	if (limit < 100){
		random = Math.random() * 350

		entities.push(new TrailerEnemy(-50, random+50));
	    limit += 1
		
	}
}


function spawnEnemy2() {
	if (limit < 100){
		random2 = Math.random() * 10
		
		
		if (0 <= random2 && random2 < 4){
			entities.push(new HomingTrailerEnemy(-50, player.y));
		    limit += 1
		}
		    
		else if (4 <= random2 && random2 < 7){
			entities.push(new ShootyTrailerEnemy(-50, 50));
		    limit += 1 
		}
		
		else if (7 <= random2 && random2 < 10){
			random = Math.random() * 350
			entities.push(new BurstTrailerEnemy(-50, random+50));
		    limit += 1 
		}
	}
}

var spawnCount;

function update() {
  spawnTimer += 1;
  spawnTimer2 += 1
  if(spawnTimer>=spawnTime&&started) {
    spawnEnemy();
    spawnTimer = 0;
  }
  
  
  if(spawnTimer2>=spawnTime2&&started) {
	  spawnEnemy2();
	  spawnTimer2 = 0;
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
    if(spawnLevel==5){
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

function linearMove(start, target, d) {
  if(target>start+d)return start+d;
  if(target<start-d)return start-d;
  return target;
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
  spawnTime2 = 180;
  spawnLevel = level;
  spawnTimer = 0;
  spawnTimer2 = 0;
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
