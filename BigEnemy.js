class BigEnemy extends Enemy {
  constructor(x,y) {
    super(x,y);
    this.w = this.w*1.2;
    this.h = this.h*1.1;
    this.color = "#d33";
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
    