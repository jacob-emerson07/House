class VortexEnemy extends Enemy {
	  constructor(x,y) {
	    super(x,y);
	    this.w = this.w*1.0;
	    this.h = this.h*1.0;
	    this.color = "#140056";
	    this.life = 10;
	    this.speed = 0;
	    this.interval = 6;
	    this.delay = 0;
	    this.startup = 60;
	    this.angle = 0;
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
			this.startup -= 1;
			
			if (this.delay >= this.interval){
				var c = new BulletEnemy(this.x, this.y, 2*Math.PI*(this.angle)/16)
				entities.push(c);
				
				if (this.angle != 15){
					this.angle += 1;
				}
				else{
					this.angle = 0
				}
				
			}
			
		  super.update();
		  }
	}