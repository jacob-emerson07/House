class Clickable extends Thing{
  constructor(x,y) {
    super();
    this.x=x;
    this.y=y;
  }
  contains(x,y) {
    return x>=this.x-this.w/2&&x<=this.x+this.w/2&&
      y>=this.y-this.h/2&&y<=this.y+this.h/2;
  }
  moused() {
    return this.contains(mouse.x,mouse.y);
  }
  clicked() {

  }
  update() {
    // this.scale+=0.1;)
    if(this.moused()) {
      this.scale += (1.2-this.scale)/3;
      if(mouse.down) {
        this.clicked();
      }
    } else {
      this.scale += (1-this.scale)/3;
    }
  }
}