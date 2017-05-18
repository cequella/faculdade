function App(canvasId) {
    Screen.call(this, canvasId, 20);

    this.drawer = new Drawer(canvasId);
    this.cursor = null;

    //temp
    this.content = []; 

    //GAMBIARRA! ODEIO JAVASCRIPT
    var wtf = this;
    document.addEventListener("mousemove", function(event){
	wtf.setCursor(event);
    });
    document.addEventListener("click", function(event){
	wtf.updateContent(event);
    });
}
App.prototype = Object.create(Screen.prototype);
App.prototype.constructor = App;

App.prototype.draw = function() {
    if(this.cursor == null) return;
    
    this.clearCanvas();
    var drawer  = this.drawer;
    var content = this.content;
    var cursor  = this.cursor;

    // Draw Content
    drawer.strokeStyle("blue");
    for(var it=0; it<content.length; it++){
	drawer.arrow(content[it].startX, content[it].startY,
		     content[it].endX, content[it].endY,
		     "v"+it);
    }

    // Draw Cursor
    drawer.strokeStyle("green");
    var last = content[content.length-1];
    drawer.arrow(cursor.startX, cursor.startY,
		 cursor.endX, cursor.endY,
		 "current");

    // Draw Result
    if(content.length >=2 ){
	var first = content[0];
	var last  = content[content.length-1];
	
	drawer.strokeStyle("red");
	drawer.arrow(first.startX, first.startY,
		     last.endX, last.endY,
		     "result");
    }
    
}
App.prototype.setCursor = function(event){
    var position = this.drawer.getMousePos(event);
    if(position == null) return;

    var length = this.content.length
    if(length>0){
	var last = this.content[length-1];
	this.cursor = {startX: last.endX, startY: last.endY, endX: position.x, endY: position.y};
    } else {
	this.cursor = {startX: 0, startY: 0, endX: position.x, endY: position.y};
    }
}
App.prototype.updateContent = function(event){
    var position = this.drawer.getMousePos(event);

    if(position==null) return;
    
    var length = this.content.length
    if(length>0){
	var last = this.content[length-1];
	this.content.push(this.cursor);
    } else {
	this.content.push({startX: 0, startY: 0, endX: position.x, endY: position.y});
    }

    console.log(this.content);
}
App.prototype.shuffleContent = function(event) {
    
}
