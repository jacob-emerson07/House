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
      if(Math.random()>0.85) {
        SOUNDS.coin.play();
        for(var i=0;i<1+Math.random()*4;++i) {
          entities.push(new Coin(this.x,this.y,Math.random()*Math.PI*2,Math.random()));
        }
      }
      if(Math.random()>0.95) {
        SOUNDS.health.play();
        entities.push(new Health(this.x,this.y,Math.random()*Math.PI*2,Math.random()));
      }
    }
  }
}