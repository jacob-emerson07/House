class HouseButton extends Clickable {
  constructor(x,y) {
    super(x,y);
    this.w=50;
    this.h=60;
    // this.drawShape=drawHouse;
    this.d = 100;
  }
  update() {
    this.d += (0-this.d)/50;
    // if(this.d>0)
    // this.d-=1;
    if(touchOn) this.clicked();
    super.update();
  }
  clicked() {
    this.shouldDelete = true;
    if(spawnLevel==1){
        window.test = new Mover(this.x,this.y);

    }
    else{
    	window.test = new Mover(this.x,this.y, coinCount);
    }
    entities.push(test);
    mouse.down = false;
    SOUNDS.start.play();
    started = true;
    frameCount=0;
  }
  drawShape(x,y,w,h,style1,style2) {
    var d = this.d;
    canvas.fillStyle = style1||'white';
    canvas.fillRect(x,y+h/2+d,w,h/2);
    canvas.fillTriangle(x+-w/10,y+h/2+1-d,w+w*2/10,-h/2);
    canvas.fillStyle = style2||'black';
    canvas.fillRect(x+w*.6,y+h/2+h/6+d*2,w/4,h*2/6);
    canvas.fillRect(x+w*.2,y+h/2+h/6+d*3,w/5,h/6);
  }
}