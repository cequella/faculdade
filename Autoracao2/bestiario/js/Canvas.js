var Canvas = (function(){
	// Constructor
	function Canvas(elementId){
		this.canvas = document.getElementById(elementId);
		this.context = this.canvas.getContext("2d");
		this.cursor = {x:0, y:0, click: false};
		
		setup.call(this);
	}

	// Private
	function setup(){		
		// Resize
		this.canvas.width  = 800;
		this.canvas.height = 600;

		// Reposition
		var temp = (window.innerWidth -this.canvas.width)/2;
		this.canvas.style.marginLeft = temp+"px";

		// Set events
		this.canvas.addEventListener("mousemove", (event)=>{
			var rect = this.canvas.getBoundingClientRect();
			this.cursor = {
				x: (event.clientX-parseInt(rect.left)),
				y: (event.clientY-parseInt(rect.top))
			};
		}, false);
		this.canvas.addEventListener("mouseup", (event)=>{
			this.cursor.click = false;			
		}, false);
		this.canvas.addEventListener("mousedown", (event)=>{
			this.cursor.click = true;			
		}, false);

	}

	// Public
	Canvas.prototype.clear = function(fill){
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		return this;
	}
	Canvas.prototype.writeInHUD = function(string, x, y){
		this.context.fillStyle="white";
		this.context.font="14px Arial";
		this.context.fillText(string, x, y);
		this.context.fillStyle="transparent";
	}

	return Canvas;
})();
