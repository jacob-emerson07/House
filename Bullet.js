class Bullet extends Thing{
  constructor(x,y,angle,parent) {
    super();
    this.x = x;
    this.y = y;
    this.w = 15;
    this.h = 15;
    this.angle = angle+Math.PI/2;
    this.parent = parent;
    this.drawShape = drawHouse;
    this.speed = 4;
    this.vx = Math.cos(angle)*this.speed;
    this.vy = Math.sin(angle)*this.speed;
    this.life = 100;
    this.color = 'blue';
  }
  hit() {
    this.shouldDelete=true;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life -= 1;
    if(this.life<=0)this.shouldDelete=true;
  }
}