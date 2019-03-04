class SpreadShootyEnemy extends Enemy {
	  constructor(x,y) {
	    super(x,y);
	    this.w = this.w*1.0;
	    this.h = this.h*1.0;
	    this.color = "#140056";
	    this.life = 10;
	    this.speed = .1;
	    this.interval = 600;
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
				var d = new BulletEnemy(this.x, this.y, eangle + (Math.PI/8))
				entities.push(d);
				var e = new BulletEnemy(this.x, this.y, eangle - (Math.PI/8))
				entities.push(e);
				this.delay = 180;
				this.delay = 0;
			}
			
		  super.update();
		  }
	}