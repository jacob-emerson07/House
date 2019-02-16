class HouseBoss extends Enemy {
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
    canvas.fillText("HOUSAY", CE.width/2,80);
    var w = 400;
    canvas.fillRect(CE.width/2-w/2, 20, w*this.life/200, 20);
    canvas.restore();
  }
}
