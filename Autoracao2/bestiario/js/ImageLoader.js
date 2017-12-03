var ImageLoader = (function(){
	// Constructor
	function ImageLoader(canvas, src){
		this.ready = false;
		this.x = 0;
		this.y = 0;
		this.width = null;
		this.height = null;
		this.context = canvas.context;
		this.content = new Image();
		
		setup.call(this, src);
	}

	// Private
	function setup(src){
		this.content.onerror = ()=>{
			console.error("\'"+this.content.src+"\' not loaded");
			this.context.fillStyle = "red";
			this.context.font = "14px Arial";
			this.context.fillText("Image not loaded. See console.", 0, 14);
			this.context.fillStyle = "transparent";
		};
		this.content.onload = ()=>{
			this.ready  = true;
			if(this.width == null)  this.width  = this.content.width;
			if(this.height == null) this.height = this.content.height;
		}
		this.content.src = src;
	}
	
	// Public
	ImageLoader.prototype.render = function(){
		this.context.drawImage(this.content, this.x, this.y, this.width, this.height);
	}
	ImageLoader.prototype.setPosition = function(x, y){
		this.x = x;
		this.y = y;
		return this;
	}
	ImageLoader.prototype.setDimension = function(width, height){
		this.width  = width;
		this.height = height;
		return this;
	}

	return ImageLoader;
})();
