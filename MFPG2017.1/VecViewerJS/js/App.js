function App(canvasId) {
    Screen.call(this, canvasId, 20);

    this.drawer = new Drawer(canvasId);
    this.cursor = null;

    //temp
    this.content = [{startX: 100, startY: 100, endX: 300, endY: 400}/*,
		    {startX: 300, startY: 400, endX: 100, endY: 300},
		    {startX: 100, startY: 300, endX: 400, endY: 500}*/]; 

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
    var drawer  = this.drawer;
    var content = this.cursor;

    // Draw all saved positions
    /*drawer.strokeStyle("blue");
    content.forEach(function(item, index){
	drawer.arrow(item.startX, item.startY,
		     item.endX, item.endY);
		     });*/
    drawer.strokeStyle("blue");
    drawer.arrow(0.0, 0.0,
		 content.x, content.y);
}
