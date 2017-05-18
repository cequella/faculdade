function App(canvasId) {
    Screen.call(this, canvasId, 20);

    this.drawer = new Drawer(canvasId);
    this.cursor = null;
    this.squareSize = Math.min(this.drawer.width(), this.drawer.height())/3;
    this.square = {x: this.drawer.centerX(this.squareSize),
		   y: this.drawer.centerY(this.squareSize),
		   size: this.squareSize};

    //GAMBIARRA! ODEIO JAVASCRIPT
    var wtf = this;
    document.addEventListener("mousemove", function(event){
	wtf.setCursor(event);
    });
}
App.prototype = Object.create(Screen.prototype);
App.prototype.constructor = App;

App.prototype.draw = function() {
    this.clearCanvas();
    var drawer  = this.drawer;
    var content = this.content;
    var cursor  = this.cursor;

    this.drawGrid();
    this.drawCursor();
    this.pseudoAngle();
}
App.prototype.drawGrid = function(){
    var drawer  = this.drawer;

    drawer.strokeStyle("black").lineWidth(1);
    
    // Vertical line
    drawer.line(drawer.width()/2, 0, drawer.width()/2, drawer.height());

    // Horizontal line
    drawer.line(0, drawer.height()/2, drawer.width(), drawer.height()/2);

    // Box
    drawer.rect(this.square.x, this.square.y, this.square.size, this.square.size);
}
App.prototype.pseudoAngle = function(){
    var drawer  = this.drawer;

    drawer.lineWidth(4)
	.strokeStyle("red")
	.line(drawer.centerX(-this.squareSize), drawer.centerY(this.squareSize), 100, 100);
}
App.prototype.drawCursor = function(){
    var drawer  = this.drawer;
    var cursor  = this.cursor;

    if(drawer != null && cursor != null){
	drawer.strokeStyle("blue").lineWidth(1);
	drawer.line(drawer.centerX(), drawer.centerY(), this.cursor.x, this.cursor.y);
    }
}
App.prototype.setCursor = function(event){
    var temp = this.drawer.getMousePos(event);
    if(temp!=null) this.cursor = temp;
}
