function Vector2D(x=0.0, y=0.0){
    this.x = x;
    this.y = y;
}

Vector2D.prototype.get = function(){
    return {x:this.x, y:this.y}
}
Vector2D.prototype.abs = function(){
    return Math.sqrt( Math.pow(this.x,2) + Math.pow(this.y,2) );
}
Vector2D.prototype.normalize = function(){
    var abs = this.abs();
    if(abs == 0.0) return this;
    this.x /= abs;
    this.y /= abs;
    return this;
}
Vector2D.prototype.product = function(k){
    this.x *= k;
    this.y *= k;
    return this;
}
Vector2D.prototype.dot = function(vec){
    return vec.x*this.x + vec.y*this.y;
}
