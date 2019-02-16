class Thing {
  constructor() {
    this.scale = 1;
    this.angle = 0;
  }
  update() {}
  draw() {
    const {x,y,w,h} = this;
    canvas.save();
    canvas.translate(x,y);
    canvas.scale(this.scale,this.scale);
    canvas.rotate(this.angle);
    canvas.translate(-w/2,-h/2);
    this.drawShape(0,0,w,h,this.color);
    canvas.restore();
  }
}
