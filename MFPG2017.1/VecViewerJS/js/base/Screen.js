function Screen(canvasId, fps){
    this.canvas  = document.getElementById(canvasId);
    this.context = this.canvas.getContext("2d");
}
Screen.prototype.clearCanvas = function(){
    this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
}
Screen.prototype.draw = function(){}
