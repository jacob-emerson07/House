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