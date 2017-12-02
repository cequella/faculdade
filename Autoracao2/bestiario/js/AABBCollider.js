var AABBCollider = (function(){
	// Constructor
	function AABBCollider(x, y, width, height){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		this.onMouseOver = function() {}
		this.onMouseOut  = function() {}
	}

	// Private

	//Public
	AABBCollider.prototype.setPosition = function(x, y){
		this.x = x;
		this.y = y;
		return this;
	}
	AABBCollider.prototype.setDimension = function(width, height){
		this.width = width;
		this.height = height;
		return this;
	}
	AABBCollider.prototype.check = function(cursor){
		if(cursor.x>this.x && cursor.x<(this.x+this.width) &&
		   cursor.y>this.y && cursor.y<(this.y+this.height)){
			this.onMouseOver();
		} else {
			this.onMouseOut();
		}
	}
	
	return AABBCollider;
})();
