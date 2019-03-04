class BombEnemy extends Enemy {
	  constructor(x,y) {
	    super(x,y);
	    this.w = this.w*1.0;
	    this.h = this.h*1.0;
	    this.color = "#4B0000";
	    this.life = 110;
	    this.speed = 2;
	    this.interval = 480;
	    this.fuse = 60;
	    this.lit = false;
	    this.timer = 0;
	    this.changer = 0;
	    this.constant = 1;
	    this.booming = false;
	  }

	  movement(dx,dy,angle,r) {
	    var tx = Math.cos(angle)*this.speed;
	    var ty = Math.sin(angle)*this.speed;
	    this.vx = linearMove(this.vx, tx, .01);
	    this.vy = linearMove(this.vy, ty, .01);
	  }
	  
	  
	  update() {
		  
			if (this.life <= 100){
				this.lit = true;
			}
			
			if (this.lit){
				this.timer += 1;
				this.changer += 1;
				this.speed = .5;
				this.color = "#FF1414";
			}
			
			if (this.changer >= 18){
				if (this.color == "#FF1414"){
					this.color = "#FFFFFF";
				}
				else if (this.color == "#FFFFFF"){
					this.color = "#FF1414";
				}
				this.changer = 0;
			}
			
			if(this.timer >= this.fuse){
				this.booming = true;
			}
			
			if(this.booming == true){
				this.constant += .01
				this.w = this.w * this.constant;
				this.h = this.h * this.constant;
			}
			
			if (this.constant >= 1.15){
				var c = new BulletEnemy(this.x, this.y, 0)
				entities.push(c);
		    	var d = new BulletEnemy(this.x, this.y, Math.PI/2)
				entities.push(d);
		    	var e = new BulletEnemy(this.x, this.y, Math.PI)
				entities.push(e);
		    	var f = new BulletEnemy(this.x, this.y, 3*Math.PI/2)
				entities.push(f)
				var f = new BulletEnemy(this.x, this.y, Math.PI/4)
				entities.push(f)
				var f = new BulletEnemy(this.x, this.y, 3*Math.PI/4)
				entities.push(f)
				var f = new BulletEnemy(this.x, this.y, 5*Math.PI/4)
				entities.push(f)
				var f = new BulletEnemy(this.x, this.y, 7*Math.PI/4)
				entities.push(f)
				
				this.shouldDelete=true;
			}
		
				
			
			
		  super.update();
		  }
	}