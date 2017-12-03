const CARD_WIDTH  = 128;
const CARD_HEIGHT = 190;

var Card = (function(){
	//Constructor
	function Card(canvas, wrapper, isPlayer){
		this.canvas = canvas;
		this.wrapper = wrapper;
		this.image = new ImageLoader(this.canvas, "assets/img/cards/"+this.wrapper.name+".png");
		this.image.setDimension(128, 190);
		this.collider = new AABBCollider(0, 0, this.image.width, this.image.height);
		this.selected = false;

		if(isPlayer){
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
	}

	// Public
	Card.prototype.setPosition = function(x, y){
		this.image.setPosition(x, y);
		this.collider.setPosition(x, y);
	}
	Card.prototype.draw = function(){
		if(!this.image.ready) return;
		this.image.render();
		this.collider.check(this.canvas.mousePos);
	}
	Card.prototype.check = function(that, status){
		return this.wrapper.status[status]-that.wrapper.status[status];
	}

	return Card;
})();
