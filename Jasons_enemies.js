class Enemy extends Thing {
  constructor(x,y) {
    super();
    this.x=x;
    this.y=y;
    this.w=50;
    this.h=60;
    this.color = 'red';
    this.drawShape = drawHouse;
    this.life =3;
    enemies.push(this);
    this.vx = 0;
    this.vy = 0;
    this.speed = 1;
    this._w=this.w;
    this._h=this.h;
    this.frame = 0;
    this.target = player;
  }
  movement(dx,dy,angle,r) {
    this.vx = Math.cos(angle+Math.PI/20)*this.speed;
    this.vy = Math.sin(angle+Math.PI/20)*this.speed;
  }
  update() {
    this.frame += 1;
    var dx = this.target.x - this.x;
    var dy = this.target.y - this.y;
    var angle = Math.atan2(dy,dx);
    var r = Math.sqrt(dx*dx+dy*dy);
    this.movement(dx,dy,angle,r);
    this.x += this.vx;
    this.y += this.vy;
    this.angle = Math.cos(this.frame*Math.PI/20)*Math.PI/24;
    // this.h = this._h * (.95+.1*Math.cos(frameCount*Math.PI/20));
    this.scale += (1-this.scale)/3;
    if(collides(this,player)) {
      this.x -= dx/r;
      this.y -= dy/r;
      if(this.target!=player) {
        dx = player.x - this.x;
        dy = player.y - this.y;
        r  = Math.sqrt(dx*dx+dy*dy);
        if(r==0){r=1;dx=1;}
      }
      player.hit();
      player.vx = dx/r*10;
      player.vy = dy/r*10;
    }
  }
  hit() {
    this.life -= 1;
    this.scale+=.2;
    SOUNDS.hit.play();
    if(this.life<=0) {
      this.shouldDelete = true;
      SOUNDS.enemyDie.play();
      if(Math.random()>0.7) {
        SOUNDS.coin.play();
        for(var i=0;i<1+Math.random()*4;++i) {
          entities.push(new Coin(this.x,this.y,Math.random()*Math.PI*2,Math.random()));
        }
      }
      if(Math.random()>0.9) {
        SOUNDS.health.play();
        entities.push(new Health(this.x,this.y,Math.random()*Math.PI*2,Math.random()));
      }
    }
  }
}

function linearMove(start, target, d) {
  if(target>start+d)return start+d;
  if(target<start-d)return start-d;
  return target;
}

class BigEnemy extends Enemy {
  constructor(x,y) {
    super(x,y);
    this.w = this.w*1.2;
    this.h = this.h*1.1;
    this.color = "#E05EFF";
    this.life = 7;
    this.speed = 3;
  }

  movement(dx,dy,angle,r) {
    var tx = Math.cos(angle)*this.speed;
    var ty = Math.sin(angle)*this.speed;
    this.vx = linearMove(this.vx, tx, .01);
    this.vy = linearMove(this.vy, ty, .01);
  }
}

class FastEnemy extends Enemy {
  constructor(x,y) {
    super(x,y);
    this.w = this.w*.7;
    this.h = this.h*.7;
    this.color = "#00FF89";
    this.life = 1;
    this.speed = 2;
    this.da = (1-Math.floor(Math.random()*2)*2)*Math.PI/5;
  }
  movement(dx,dy,angle,r) {
    angle += this.da;
    var tx = Math.cos(angle)*this.speed;
    var ty = Math.sin(angle)*this.speed;
    this.vx = linearMove(this.vx, tx, .4);
    this.vy = linearMove(this.vy, ty, .4);
  }
}

class Boss extends Enemy {
  constructor(x,y) {
    super(x,y);
    this.w = this.w*3;
    this.h = this.h*3;
    this.color = '#888';
    this.life = 200;
    this.speed = 1;
    SOUNDS.bossSpawn.play();
    this.state = 0;
    this.stateTimer = 200;
    this.dx = 0;
    this.dy = 0;
    this.stage = 0;
    this._w=this.w;
    this._h=this.h;
  }
  movement(dx,dy,angle,r) {
    this.dx=dx/r;
    this.dy=dy/r;
    var tx = Math.cos(angle)*this.speed;
    var ty = Math.sin(angle)*this.speed;
    this.vx = linearMove(this.vx, tx, .4);
    this.vy = linearMove(this.vy, ty, .4);
  }
  update() {
    if(this.life<100&&this.stage==0) {
      this.color = 'red';
      this.stage = 1;
      this._w*=0.7;
      this._h*=0.7;
      SOUNDS.bossSpawn.play();
    }
    this.stateTimer -= 1;
    if(this.stateTimer<=0) {
      this.stateTimer = 50;
      var ps = this.state;
      this.state = Math.floor(Math.random()*6);
      while(ps==1&&this.state==1)this.state = Math.floor(Math.random()*6);
      if(this.stage==0) {
        this.target = {
          x: Math.random()*CE.width,
          y: Math.random()*CE.height,
        };
      }
    }
    if(this.state==0) {
      this.speed = 1;
      this.w += (this._w-this.w)/3;
      this.h += (this._h-this.h)/3;
      if(this.stage!=0)this.speed = 2.5;
    } else if(this.state==1) {
      this.w += (this._w-this.w)/3;
      this.h += (this._h-this.h)/3;
      this.target = player;
      this.speed = Math.cos(this.stateTimer*Math.PI/50-Math.PI/4)*5;
    } else if(this.state==2) {
      this.w += (this._w-this.w)/3;
      this.h += (this._h-this.h)/3;
      if(this.stage!=0) {
      this.speed = -1;
        if(this.frame%20==0) {
          entities.push(new FastEnemy(this.x+this.dx*10,this.y+this.dy*10));
        }
      }
    } else if(this.state==3) {
      this.w = (.9+4*(50-this.stateTimer)/50)*this._w;
      this.h += (this._h/2-this.h)/3;
      this.speed = 0;
    }
    else if(this.state==4) {
      this.h = (.9+4*(50-this.stateTimer)/50)*this._h;
      this.w += (this._w/2-this.w)/3;
      this.speed = 0;
    }
    else if(this.state==5) {
      this.w += (this._w*1.5-this.w)/10;
      this.h += (this._h*1.5-this.h)/10;
    }
    if(this.frame%50==0) {
      entities.push(new FastEnemy(this.x+this.dx*10,this.y+this.dy*10));
    }
    super.update();
  }
  // movement(dx,dy,angle,r) {
  //   this.tx = Math.cos(angle)*this.speed;
  //   this.ty = Math.sin(angle)*this.speed;
  //   this.vx = (this.tx-this.vx)/10;
  //   this.vy = (this.ty-this.vy)/10;
  // }
  draw() {
    super.draw();
    canvas.save();
    var len = 20;
    if(this.frame<20)
    canvas.translate(0,(-20+this.frame)*10);
    canvas.fillStyle = this.color;
    canvas.textAlign='center';
    canvas.font = '40px Impact';
    canvas.fillText("HOUSE", CE.width/2,80);
    var w = 400;
    canvas.fillRect(CE.width/2-w/2, 20, w*this.life/200, 20);
    canvas.restore();
  }
}
