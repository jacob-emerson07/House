var startMenuCanvas = document.getElementById("startMenu");
var context = startMenuCanvas.getContext("2d");

function drawHouse(x,y,w,h,style1,style2) {
    canvas.fillStyle = style1||'white';
    canvas.fillRect(x,y+h/2,w,h/2);
    canvas.fillTriangle(x+-w/10,y+h/2+1,w+w*2/10,-h/2);
    canvas.fillStyle = style2||'black';
    canvas.fillRect(x+w*.6,y+h/2+h/6,w/4,h*2/6);
    canvas.fillRect(x+w*.2,y+h/2+h/6,w/5,h/6);
}

/*var myGamePiece;

function startGame()
{
    myGameArea.start();
    myGamePiece = new component(30,30,"red", 10,120);
}

var myGameArea = {
    canvas : document.createElement("Canvas"),
    start : function(){
        this.canvas.width = 480;
        this.canvas.height = 250;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }
}

function component(width, height, color, x, y)
{
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
}

window.addEventListener('load', startGame);*/
/*window.addEventListener('mousemove', onmousemove);
window.addEventListener('mousedown', onmousedown);
window.addEventListener('mouseup', onmouseup);
window.addEventListener('keydown', onkeydown);
window.addEventListener('keyup', onkeyup);*/
