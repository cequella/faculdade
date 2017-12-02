var Card = (function(){
	//Constructor
	function Card(canvas, src){
		this.canvas = canvas;
		this.image = new ImageLoader(this.canvas, src);
		this.image.setDimension(128, 190);
		this.collider = new AABBCollider(0, 0, this.image.width, this.image.height);
		this.selected = false;

		this.collider.onMouseOver = ()=>{
			if(this.selected) return;
			this.selected = true;
			this.image.y -= 20;
			this.collider.y -= 20;
		}
		this.collider.onMouseOut = ()=>{
			if(!this.selected) return;
			this.selected = false;
			this.image.y += 20;
			this.collider.y += 20;
		}
	}

	// Public
	Card.prototype.setPosition = function(x, y){
		this.image.setPosition(x, y);
		this.collider.setPosition(x, y);
	}
	Card.prototype.draw = function(){
		if(!this.image.ready) return;
		this.image.render();
		this.collider.check(this.canvas.getMousePos());
	}

	return Card;
})();
