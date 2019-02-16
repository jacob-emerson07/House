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