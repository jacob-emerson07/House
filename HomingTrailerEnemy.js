class HomingTrailerEnemy extends Enemy {
	  constructor(x,y) {
	    super(x,y);
	    this.w = this.w*1.3;
	    this.h = this.h*1.0;
	    this.color = "#E03838";
	    this.life = 10;
	    this.speed = 8;
	    this.interval = 600;
	    this.delay = 0;
	    this.timer = 0;
	    //this.target = this;
	  }
	  
	  //MEANT TO BE SPAWNED AT THE SAME Y CORRDINATE AS THE PLAYER, BUT LESS FREQUENTLY

	  movement(dx,dy,angle,r) {
	    this.x += this.speed
	  }
	  
	  
	  update() {
		  this.timer += 1;
		  
		  if (this.timer >= 600){
				this.life = 0
			}
		  
		  
		  	super.update();
		  }
	}