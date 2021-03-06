class SpreadShootyTrailerEnemy extends Enemy {
	  constructor(x,y) {
	    super(x,y);
	    this.w = this.w*1.3;
	    this.h = this.h*1.0;
	    this.color = "#FF7F00";
	    this.life = 10;
	    this.speed = 3;
	    this.interval = 600;
	    this.limit = 0;
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
		    
			if (this.x == player.x && this.limit == 0){
				var c = new BulletEnemy(this.x, this.y, Math.PI*(1/2))
				entities.push(c);
				
				var d = new BulletEnemy(this.x, this.y, Math.PI*(1/2) + (Math.PI/8))
				entities.push(d);
				var e = new BulletEnemy(this.x, this.y, Math.PI*(1/2) - (Math.PI/8))
				entities.push(e);
				this.delay = 180;
				this.delay = 0;
				
				this.limit = 1
			}
			
			if (this.timer >= 600){
				this.life = 0
			}
			
		  super.update();
		  }
	}