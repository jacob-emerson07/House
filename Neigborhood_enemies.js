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


/*
class ShootyEnemy extends Enemy {
	  constructor(x,y) {
	    super(x,y);
	    this.w = this.w*1.2;
	    this.h = this.h*1.1;
	    this.color = "#E05EFF";
	    this.life = 3;
	    this.speed = .5;
	    this.interval = 120;
	    this.delay = 0;
	    this.target = player;
	    }

	  movement(dx,dy,angle,r) {
	    var tx = Math.cos(angle)*this.speed;
	    var ty = Math.sin(angle)*this.speed;
	    this.vx = linearMove(this.vx, tx, .01);
	    this.vy = linearMove(this.vy, ty, .01);
	  }
	  
	  update(){
		this.delay += 1;  
		var edx = this.target.x - this.x;
	    var edy = this.target.y - this.y;
	    var eangle = Math.atan2(edy,edx);
		if (this.delay >= this.interval){
			entities.push(new BulletEnemy(this.x + edx*10, this.y + edy*10, eangle));
			this.delay = 0;
		}
	  }
	}
*/

class ShootyEnemy extends Enemy {
	  constructor(x,y) {
	    super(x,y);
	    this.w = this.w*1.0;
	    this.h = this.h*1.0;
	    this.color = "#E05EFF";
	    this.life = 3;
	    this.speed = .1;
	    this.interval = 480;
	    this.delay = 0;
	    //this.target = this;
	  }

	  movement(dx,dy,angle,r) {
	    var tx = Math.cos(angle)*this.speed;
	    var ty = Math.sin(angle)*this.speed;
	    this.vx = linearMove(this.vx, tx, .01);
	    this.vy = linearMove(this.vy, ty, .01);
	  }
	  
	  
	  update() {
		  
			this.delay += 1;  
			
			var edx = this.target.x - this.x;
		    var edy = this.target.y - this.y;
		    
		    if(this.target!=player) {
		        edx = player.x - this.x;
		        edy = player.y - this.y;
		      }
		    var eangle = Math.atan2(edy,edx);
		    
		    
			if (this.delay >= this.interval){
				var c = new BulletEnemy(this.x, this.y, eangle)
				entities.push(c);
				this.delay = 0;
			}
			
		  super.update();
		  }
	}


class BigEnemy extends Enemy {
  constructor(x,y) {
    super(x,y);
    this.w = this.w*1.5;
    this.h = this.h*1.5;
    this.color = "#FAFF4B";
    this.life = 21;
    this.speed = .25;
  }

  movement(dx,dy,angle,r) {
    var tx = Math.cos(angle)*this.speed;
    var ty = Math.sin(angle)*this.speed;
    this.vx = linearMove(this.vx, tx, .01);
    this.vy = linearMove(this.vy, ty, .01);
  }
  
}

class BulletEnemy extends Enemy{
	  constructor(x,y,angle) {
	    super();
	    this.x = x;
	    this.y = y;
	    this.w = this.w * .3;
	    this.h = this.h * .3;
	    this.angle = angle+Math.PI/2;
	    this.drawShape = drawHouse;
	    this.speed = 1;
	    this.vx = Math.cos(angle)*this.speed;
	    this.vy = Math.sin(angle)*this.speed;
	    this.life = 1;
	    this.color = '#E05EFF';
	    this.timer = 300
	  }
	  
	  movement(dx,dy,angle,r) {
		  this.x += this.vx;
		  this.y += this.vy;
		  }
	  
	  update() {
	    this.timer -= 1;
	    if(this.timer<=0)this.shouldDelete=true;
	    super.update()
	  }
	}


class TankBoss extends Enemy {
	  constructor(x,y) {
	    super(x,y);
	    this.w = this.w*1.5;
	    this.h = this.h*1.5;
	    this.color = "#A1A600";
	    this.life = 100;
	    this.speed = .5;
	    this.pattern = 1
	    //800 450
	  }
	  update() {
		    this.timer -= 1;
		    if(this.pattern == 1){
		    	this.x += this.speed
		    }
		    super.update()
		  }
}

class NeigborhoodBoss extends Enemy {
	  constructor(x,y) {
	    super(x,y);
	    this.w = this.w*1.5;
	    this.h = this.h*1.5;
	    this.color = "#00843B";
	    this.life = 100;
	    this.speed = 5;
	    this.delay = 0;
	    this.pattern = 1;
	    this.random = 0
	  }

	  movement(dx,dy,angle,r) {
	    var tx = Math.cos(angle)*this.speed;
	    var ty = Math.sin(angle)*this.speed;
	    this.vx = linearMove(this.vx, tx, .01);
	    this.vy = linearMove(this.vy, ty, .01);
	  }
	  
	  
	  update() {
		  
		  	this.random = Math.floor(Math.random() * 10) + 1;
		  
			this.delay -= 1;  
			var edx = this.target.x - this.x;
		    var edy = this.target.y - this.y;
		    
		    if(this.target!=player) {
		        edx = player.x - this.x;
		        edy = player.y - this.y;
		      }
		    var eangle = Math.atan2(edy,edx);
			if ((this.delay <= 0)&&(this.random <= 6)){
				var c = new BulletEnemyFast(this.x, this.y, eangle)
				entities.push(c);
				this.delay = 180;
			}
			
			if ((this.delay <= 0)&&(this.random > 6)&&(this.random<=7)){
				var c = new BurstBomb(this.x, this.y, eangle)
				entities.push(c);
				this.delay = 180;
			}
			
			if ((this.delay <= 0)&&(this.random >= 8)){
				var c = new BulletEnemy(this.x, this.y, eangle)
				entities.push(c);
				var d = new BulletEnemy(this.x, this.y, eangle + (Math.PI/8))
				entities.push(d);
				var e = new BulletEnemy(this.x, this.y, eangle - (Math.PI/8))
				entities.push(e);
				this.delay = 180;
			}
			
			if(this.pattern == 1){
		    	this.x += this.speed
			}
			if(this.pattern == 2){
		    	this.y -= this.speed
			}
			if(this.pattern == 3){
		    	this.x -= this.speed
			}
			if(this.pattern == 4){
		    	this.y += this.speed
			}
			
			if(this.pattern == 1 & this.x >= 725){
		    	this.pattern = 2
			}
			if(this.pattern == 2 & this.y <= 75){
		    	this.pattern = 3
			}
			if(this.pattern == 3 & this.x <= 75){
		    	this.pattern = 4
			}
			if(this.pattern == 4 & this.y >= 375){
		    	this.pattern = 1
			}
			
		  super.update();
		//800 450
		  
	}
}


class NeigborhoodBoss2 extends Enemy {
	  constructor(x,y) {
	    super(x,y);
	    this.w = this.w*1.5;
	    this.h = this.h*1.5;
	    this.color = "#00843B";
	    this.life = 100;
	    this.speed = 5;
	    this.delay = 0;
	    this.pattern = 3;
	    this.random = 0
	  }

	  movement(dx,dy,angle,r) {
	    var tx = Math.cos(angle)*this.speed;
	    var ty = Math.sin(angle)*this.speed;
	    this.vx = linearMove(this.vx, tx, .01);
	    this.vy = linearMove(this.vy, ty, .01);
	  }
	  
	  
	  update() {
		  
		  	this.random = Math.floor(Math.random() * 10) + 1;
		  
			this.delay -= 1;  
			var edx = this.target.x - this.x;
		    var edy = this.target.y - this.y;
		    
		    if(this.target!=player) {
		        edx = player.x - this.x;
		        edy = player.y - this.y;
		      }
		    var eangle = Math.atan2(edy,edx);
			if ((this.delay <= 0)&&(this.random <= 6)){
				var c = new BulletEnemyFast(this.x, this.y, eangle)
				entities.push(c);
				this.delay = 180;
			}
			
			if ((this.delay <= 0)&&(this.random > 6)&&(this.random<=7)){
				var c = new BurstBomb(this.x, this.y, eangle)
				entities.push(c);
				this.delay = 180;
			}
			
			if ((this.delay <= 0)&&(this.random >= 8)){
				var c = new BulletEnemy(this.x, this.y, eangle)
				entities.push(c);
				var d = new BulletEnemy(this.x, this.y, eangle + (Math.PI/8))
				entities.push(d);
				var e = new BulletEnemy(this.x, this.y, eangle - (Math.PI/8))
				entities.push(e);
				this.delay = 180;
			}
			
			if(this.pattern == 1){
		    	this.x += this.speed
			}
			if(this.pattern == 2){
		    	this.y -= this.speed
			}
			if(this.pattern == 3){
		    	this.x -= this.speed
			}
			if(this.pattern == 4){
		    	this.y += this.speed
			}
			
			if(this.pattern == 1 & this.x >= 725){
		    	this.pattern = 2
			}
			if(this.pattern == 2 & this.y <= 75){
		    	this.pattern = 3
			}
			if(this.pattern == 3 & this.x <= 75){
		    	this.pattern = 4
			}
			if(this.pattern == 4 & this.y >= 375){
		    	this.pattern = 1
			}
			
		  super.update();
		//800 450
		  
	}
}



class BulletEnemyFast extends Enemy{
	  constructor(x,y,angle) {
	    super();
	    this.x = x;
	    this.y = y;
	    this.w = this.w * .3;
	    this.h = this.h * .3;
	    this.angle = angle+Math.PI/2;
	    this.drawShape = drawHouse;
	    this.speed = 2;
	    this.vx = Math.cos(angle)*this.speed;
	    this.vy = Math.sin(angle)*this.speed;
	    this.life = 1;
	    this.color = '#00843B';
	    this.timer = 200
	  }
	  
	  movement(dx,dy,angle,r) {
		  this.x += this.vx;
		  this.y += this.vy;
		  }
	  
	  update() {
	    this.timer -= 1;
	    if(this.timer<=0)this.shouldDelete=true;
	    super.update()
	  }
	}

class BurstBomb extends Enemy{
	  constructor(x,y,angle) {
	    super();
	    this.x = x;
	    this.y = y;
	    this.w = this.w * .5;
	    this.h = this.h * .5;
	    this.angle = angle+Math.PI/2;
	    this.drawShape = drawHouse;
	    this.speed = 1;
	    this.vx = Math.cos(angle)*this.speed;
	    this.vy = Math.sin(angle)*this.speed;
	    this.life = 1;
	    this.color = '#004A21';
	    this.timer = 120
	  }
	  
	  movement(dx,dy,angle,r) {
		  this.x += this.vx;
		  this.y += this.vy;
		  }
	  
	  update() {
	    this.timer -= 1;
	    if(this.timer<=0){
	    	var c = new BulletEnemy(this.x, this.y, 0)
			entities.push(c);
	    	var d = new BulletEnemy(this.x, this.y, Math.PI/2)
			entities.push(d);
	    	var e = new BulletEnemy(this.x, this.y, Math.PI)
			entities.push(e);
	    	var f = new BulletEnemy(this.x, this.y, 3*Math.PI/2)
			entities.push(f);
	    	
	    	this.shouldDelete=true;
	    }
	    super.update()
	  }
	}