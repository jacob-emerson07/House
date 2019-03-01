class mansionBoss extends Enemy {
  constructor(x,y) {
    super(x,y);
    this.w = 100;
    this.h = 70;
    this.color = 'green';
    this.drawShape = drawHouse;
    this.life = 1000;
    this.speed = .5;
    SOUNDS.boxbossSpawn.play();
    entities.push(new boxBoss(x,y));
    entities.push(new HouseBoss(x,y));
    entities.push(new neighborhoodBoss(x, y));
    this.state = 0;
    this.stateTimer = 200;
    this.dx = 0;
    this.dy = 0;
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
    
    super.update();
  
  }
  draw() {
    super.draw();
    canvas.save();
    var len = 20;
    if(this.frame<20)
    canvas.translate(0,(-20+this.frame)*10);
    canvas.fillStyle = this.color;
    canvas.textAlign='center';
    canvas.font = '40px Impact';
    canvas.fillText("BOXSAY", CE.width/2,80);
    var w = 400;
    canvas.fillRect(CE.width/2-w/2, 20, w*this.life/100, 20);
    canvas.restore();
  }
}