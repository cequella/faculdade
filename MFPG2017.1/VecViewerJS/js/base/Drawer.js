function Drawer(canvasId) {
    this.canvas  = document.getElementById(canvasId);
    this.context = this.canvas.getContext("2d");
}

Drawer.prototype.width = function(){
    return this.canvas.with;
}
Drawer.prototype.height = function(){
    return this.canvas.height;
}
Drawer.prototype.centerX = function(exclude){
    return (this.canvas.width-exclude)/2;
}
Drawer.prototype.centerY = function(exclude){
    return (this.canvas.height-exclude)/2;
}

Drawer.prototype.getMousePos = function(event) {
    var rect = this.canvas.getBoundingClientRect(), // abs. size of element
	scaleX = this.canvas.width / rect.width,    // relationship bitmap vs. element for X
	scaleY = this.canvas.height / rect.height;  // relationship bitmap vs. element for Y
    
    var x = (event.clientX - rect.left) * scaleX;
    var y = (event.clientY - rect.top) * scaleY;

    if (x>=0.0 && x<this.canvas.width && y>=0.0 && y<this.canvas.height){
	return {x: Math.floor(x), y: Math.floor(y)};
    } else {
	return null;
    }
}
Drawer.prototype.fillStyle = function(style){
    this.context.fillStyle = style;
}
Drawer.prototype.strokeStyle = function(style){
    this.context.strokeStyle = style;
}

Drawer.prototype.circle = function(centerX, centerY, radius, type="STROKE"){
    this.context.beginPath();
    this.context.arc(centerX, centerY, radius, 0, 2*Math.PI);
    if(type=="FILL"){
	this.context.fill();
    } else {
	this.context.stroke();
    }
    this.context.closePath();
}
Drawer.prototype.line = function(startX, startY, endX, endY){
    this.context.beginPath();
    this.context.moveTo(startX,startY);
    this.context.lineTo(endX,endY);
    this.context.stroke()
    this.context.closePath();
}
Drawer.prototype.text = function(text, font, startX, startY, stroke=true){
    this.context.font = font;
    if(stroke){
	this.context.strokeText(text, startX, startY);
    } else {
	this.context.fillText(text, startX, startY);
    }
}
