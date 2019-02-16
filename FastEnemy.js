class FastEnemy extends Enemy {
  constructor(x,y) {
    super(x,y);
    this.w = this.w*.7;
    this.h = this.h*.7;
    this.color = "#b99";
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
