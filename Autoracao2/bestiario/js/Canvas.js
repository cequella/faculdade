var Canvas = (function(){
	// Private Members
	var canvas;
	var context;
	var mousePos = {x:0, y:0};
	
	// Constructor
	function Canvas(elementId){
		canvas  = document.getElementById(elementId);
		context = canvas.getContext("2d");
		
		setup.call(this);
	}

	// Private
	function setup(){		
		// Resize
		canvas.width  = 800;
		canvas.height = 600;

		// Reposition
		var temp = (window.innerWidth -canvas.width)/2;
		canvas.style.marginLeft = temp+"px";

		// Set events
		canvas.addEventListener("mousemove", function(event){
			var rect = canvas.getBoundingClientRect();
			mousePos = {
				x: (event.clientX-parseInt(rect.left)),
				y: (event.clientY-parseInt(rect.top))
			};
		}, false);
	}

	// Public
	Canvas.prototype.clear = function(fill){
		context.clearRect(0, 0, canvas.width, canvas.height);
		return this;
	}
	Canvas.prototype.getContext = function(){
		return context;
	}
	Canvas.prototype.getMousePos = function(){
		return mousePos;
	}
	Canvas.prototype.writeInHUD = function(string, x, y){
		context.fillStyle="white";
		context.fontStyle="14px Arial";
		context.fillText(string, x, y);
		context.fillStyle="transparent";
	}

	return Canvas;
})();
