class ShootyTrailerEnemy extends Enemy {
	  constructor(x,y) {
	    super(x,y);
	    this.w = this.w*1.3;
	    this.h = this.h*1.0;
	    this.color = "#E05EFF";
	    this.life = 10;
	    this.speed = 2;
	    this.interval = 90;
	    this.delay = 0;
	    this.timer = 0;
	    //this.target = this;
	  }
	  
	  //MEANT TO BE SPAWNED AT THE SAME Y CORRDINATE AS THE PLAYER, BUT LESS FREQUENTLY

	  movement(dx,dy,angle,r) {
	    this.x += this.speed
	  }
	  
	  
	  update() {
		  
			this.delay += 1;  
			this.timer += 1;
			
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
			
			if (this.timer >= 600){
				this.life = 0
			}
			
		  super.update();
		  }
	}