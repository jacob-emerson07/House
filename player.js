class Mover extends Thing{
  constructor(x,y,z=0) {
    super();
    this.x=x;
    this.y=y;
    this.w=50;
    this.h=60;
    this.vx = 0;
    this.vy = 0;
    this.moveSpeed = 3;
    this.update = this.updatePlatformer;
    this.moveAnimation=0;
    this.healthupgrade = 0;
    this.maxLife = 10 + (this.healthupgrade*5);
    this.life = this.maxLife;
    player = this;
    this.invul = 0;
    this.moving = false;
    this.coins = 0 + z;
    this.moveFrame = 0;
    this.shooting = false;
    this.shootupgrade = 1;
    this.shootTimer = 0;
  }
  hit() {
    if(this.life<=0)return;
    if(this.invul>0)return;
    this.scale += 0.3;
    this.life -= 1;
    this.invul = 20;
    if(this.life<=0) {
      SOUNDS.die.play();
    }
    else
    SOUNDS.playerHit.play();
  }
  updateAimAngle() {
    if(touchOn&&touchJoySticks[1].held) {
      this.aimAngle = touchJoySticks[1].output.angle;
      this.shooting = true;
      return;
    }
    this.shooting = mouse.held;
    if(mouse.down)this.shootTimer=0;
    var dx = mouse.x - this.x;
    var dy = mouse.y - this.y;
    this.aimAngle = Math.atan2(dy,dx);
  }
  doWobble() {
    var frq = 16;
    this.angle = Math.sin(this.moveFrame*Math.PI/frq)*Math.PI/24*this.moveAnimation;
    if(this.moving&&this.moveFrame%frq==1) {
      SOUNDS.footstep.play();
    }
    if(!this.moveAnimation) this.moveFrame = 0;
  }
  doShoot() {
    if(win) return;
    if(this.shooting&&this.shootTimer%10==0&&this.shootupgrade==0) {
      var b = new Bullet(
        this.x + Math.cos(this.aimAngle)*50,
        this.y + Math.sin(this.aimAngle)*50,
        this.aimAngle,this);
      entities.push(b);
      playerBullets.push(b);
      SOUNDS.shoot.play();
    }
    else if(this.shooting&&this.shootTimer%10==0&&this.shootupgrade==1) {
    if(win) return;
    if(this.shooting&&this.shootTimer%10==0) {
    for (i = 0; i < 5; i++){
      var b = new Bullet(
        this.x + Math.cos(this.aimAngle)*50,
        this.y + Math.sin(this.aimAngle)*50,
        this.aimAngle + ((i-2)*.1),this);
      entities.push(b);
      playerBullets.push(b);
      SOUNDS.shoot.play();
    }
    }
    }
  }
  otherUpdates() {
    this.moveFrame += 1;
    this.shootTimer += 1;
    this.scale += (1-this.scale)/3;
    if(this.invul>0)
      this.invul -= 1;
    this.updateAimAngle();
    this.doWobble();
    this.doShoot();
    if(this.x<0)this.x=0;
    if(this.x>CE.width)this.x=CE.width;
    if(this.y<0)this.y=0;
    if(this.y>CE.height)this.y=CE.height;
  }
  updatePlatformer() {
    var {inputX, inputY} = getAxes();
    this.vx = inputX*this.moveSpeed;
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0;
    if(this.y>CE.height*.8) {
      this.y = CE.height*.8;
      this.vy = 0;
    }
    if(inputY) {
      this.update = this.updateMover;
    }
    if(this.vx) {
      this.moveAnimation += (1-this.moveAnimation)/10;
      this.moving = true;
    } else {
      this.moveAnimation += (0-this.moveAnimation)/10;
      this.moving = false;
    }

    this.otherUpdates();
  }
  updateMover() {
    var {inputX, inputY} = getAxes();
    if(this.life<=0) {
      this.vx *= 0.8;
      this.vy *= 0.8;
    }
    else
    if(this.invul) {
      this.vx += (inputX*this.moveSpeed-this.vx)/2;
      this.vy += (inputY*this.moveSpeed-this.vy)/2;
    } else {
      this.vx = inputX*this.moveSpeed;
      this.vy = inputY*this.moveSpeed;
    }
    this.x += this.vx;
    this.y += this.vy;
    if(this.vx||this.vy) {
      this.moveAnimation += (1-this.moveAnimation)/10;
      this.moving = true;
    } else {
      this.moveAnimation += (0-this.moveAnimation)/10;
      this.moving = false;
    }
    this.otherUpdates();
  }
  drawShape(x,y,w,h) {
    drawHouse(x,y,w,h);
    canvas.translate(w*.5,h*.6);
    canvas.scale(0.3,0.3);
    canvas.rotate(this.aimAngle+Math.PI/2);
    drawHouse(-w/2,-h*3,w,h);
  }
}