function App(canvasId) {
    Screen.call(this, canvasId, 20);

    this.drawer = new Drawer(canvasId);
    this.cursor = null;

    //GAMBIARRA! ODEIO JAVASCRIPT
    var wtf = this;
    document.addEventListener("mousemove", function(event){
	wtf.cursor = wtf.drawer.getMousePos(event);
    });
}
App.prototype = Object.create(Screen.prototype);
App.prototype.constructor = App;

App.prototype.draw = function() {
    if(this.cursor == null) return;
    
    this.clearCanvas();
    var drawer = this.drawer;
    var cursor = this.cursor;

    var aux = new Vector2D(cursor.x, cursor.y);
    aux.normalize().product(15.0);
    normal = new Vector2D(cursor.x/2+aux.get().y, cursor.y/2-aux.get().x); //o vetor perpendicular a (x,y) é (y, -x)

    drawer.strokeStyle("blue");
    drawer.line(0,0,
		cursor.x,cursor.y);
    drawer.strokeStyle("red");
    drawer.line(cursor.x/2, cursor.y/2,
		normal.get().x, normal.get().y);
}
