class TrailerEnemy extends Enemy {
	  constructor(x,y) {
	    super(x,y);
	    this.w = this.w*1.3;
	    this.h = this.h*1.0;
	    this.color = "#008DFF";
	    this.life = 10;
	    this.speed = 5;
	    this.interval = 600;
	    this.delay = 0;
	    this.timer = 0;
	    //this.target = this;
	  }
	  
	  //MEANT TO BE SPAWNED CONSTANTLY AT X = -50 AND ANY Y

	  movement(dx,dy,angle,r) {
	    this.x += this.speed
	  }
	  
	  
	  update() {
		  this.timer += 1
		  
		  if (this.timer >= 600){
				this.life = 0
			}
		  
		  
		  super.update();
		  }
	}