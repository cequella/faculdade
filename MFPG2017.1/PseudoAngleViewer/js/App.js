function App(canvasId) {
    Screen.call(this, canvasId, 20);

    this.drawer = new Drawer(canvasId);
    this.cursor = null;
    this.squareSize = Math.min(this.drawer.width(), this.drawer.height())/3;
    this.halfSquareSize = this.squareSize/2.0;
    this.square = {x: this.drawer.centerX(this.squareSize),
		   y: this.drawer.centerY(this.squareSize),
		   left: this.drawer.centerX()-this.halfSquareSize,
		   right: this.drawer.centerX()+this.halfSquareSize,
		   top: this.drawer.centerY()-this.halfSquareSize,
		   bottom: this.drawer.centerY()+this.halfSquareSize,
		   size: this.squareSize};
    this.pa = 0.0;

    //GAMBIARRA! ODEIO JAVASCRIPT
    var wtf = this;
    document.addEventListener("mousemove", function(event){
	wtf.setCursor(event);
    });
}
App.prototype = Object.create(Screen.prototype);
App.prototype.constructor = App;

App.prototype.clamp = function(value, min, max){
    return Math.max(min,Math.min(max,value));
}
App.prototype.updatePseudoAngle = function(){
    if(this.drawer == null || this.cursor == null) return;
    
    var   dx  = this.cursor.x - this.drawer.centerX();
    var   dy  = this.drawer.centerY() - this.cursor.y; // -dy, because my y-axis is inverted 
    const adx = Math.abs(dx);
    const ady = Math.abs(dy);
    
    var code = (adx < ady) ? 1 : 0;
    if (dx < 0)  code += 2;
    if (dy < 0)  code += 4;

    switch (code){
    case 0://[  0, 45]
	this.pa = (dx==0)? 0:ady/adx;
	break;
    case 1://( 45, 90]
	this.pa = (2.0 - (adx/ady));
	break;
    case 3://( 90,135)
	this.pa = (2.0 + (adx/ady));
	break;
    case 2://[135,180]
	this.pa = (4.0 - (ady/adx));
	break;
    case 6://(180,225]
	this.pa = (4.0 + (ady/adx));
	break;
    case 7://(225,270)
	this.pa = (6.0 - (adx/ady));
	break;
    case 5://[270,315)
	this.pa = (6.0 + (adx/ady));
	break;
    case 4://[315,360)
	this.pa = (8.0 - (ady/adx));
	break;
    }
}
App.prototype.draw = function() {
    this.clearCanvas();
    var drawer  = this.drawer;
    var content = this.content;
    var cursor  = this.cursor;

    this.updatePseudoAngle();
    
    this.drawGrid();
    this.drawCursor();
    this.drawPseudoArc(this.pa);
}
App.prototype.drawGrid = function(){
    var drawer  = this.drawer;

    drawer.strokeStyle("black").lineWidth(1);
    
    // Vertical line
    drawer.line(drawer.width()/2, 0, drawer.width()/2, drawer.height());

    // Horizontal line
    drawer.line(0, drawer.height()/2, drawer.width(), drawer.height()/2);

    // Box
    drawer.rect(this.square.x, this.square.y, this.square.size, this.square.size);
}
App.prototype.drawPseudoArc = function(value){
    var   drawer = this.drawer;
    const size   = this.squareSize;
    const hSize  = this.halfSquareSize;

    if(value >= 8.0){
	value = value%8.0;
    } else if(value < 0.0){
	value = 8.0-Math.abs(value);
	value = value%8.0;
    }

    drawer.lineWidth(4).strokeStyle("red");
    
    if(value>=0){
	const temp = Math.min(1.0, value);
	
	drawer.line(drawer.centerX(-size),
		    drawer.centerY(),
		    drawer.centerX(-size),
		    drawer.centerY()-hSize*temp);

	if(value <= 1){
	    drawer.circle(drawer.centerX(-size),
			  drawer.centerY()-hSize*temp, 2);
	    drawer.text(this.pa.toString(),
			"14px Arial",
			drawer.centerX(-size),
			drawer.centerY()-hSize*temp,
		       "FILL");
	}
    } else return;
    if(value>1){
	const temp = Math.min(1.0, value-1.0);
	
	drawer.line(drawer.centerX(-size),
		    drawer.centerY(size),
		    drawer.centerX(-size)-hSize*temp,
		    drawer.centerY(size));

	if(value <= 2){
	    drawer.circle(drawer.centerX(-size)-hSize*temp,
			  drawer.centerY(size), 2);
	    drawer.text(this.pa.toString(),
			"14px Arial",
			drawer.centerX(-size)-hSize*temp,
			drawer.centerY(size),
		       "FILL");
	}
    } else return;
    if(value>2){
	const temp = Math.min(1.0, value-2.0);
	
	drawer.line(drawer.centerX(),
		    drawer.centerY(size),
		    drawer.centerX()-hSize*temp,
		    drawer.centerY(size));

	if(value <= 3){
	    drawer.circle(drawer.centerX()-hSize*temp,
			  drawer.centerY(size), 2);
	    drawer.text(this.pa.toString(),
			"14px Arial",
			drawer.centerX()-hSize*temp,
			drawer.centerY(size),
		       "FILL");
	}
    } else return;
    if(value>3){
	const temp = Math.min(1.0, value-3.0);
	
	drawer.line(drawer.centerX(size),
		    drawer.centerY(size),
		    drawer.centerX(size),
		    drawer.centerY(size)+temp*hSize);

	if(value <= 4){
	    drawer.circle(drawer.centerX(size),
			  drawer.centerY(size)+temp*hSize, 2);
	    drawer.text(this.pa.toString(),
			"14px Arial",
			drawer.centerX(size),
			drawer.centerY(size)+temp*hSize,
			"FILL");
	}
    } else return;
    if(value>4){
	const temp = Math.min(1.0, value-4.0);
	
	drawer.line(drawer.centerX(size),
		    drawer.centerY(),
		    drawer.centerX(size),
		    drawer.centerY()+hSize*temp);

	if(value <= 5){
	    drawer.circle(drawer.centerX(size),
			  drawer.centerY()+hSize*temp, 2);
	    drawer.text(this.pa.toString(),
			"14px Arial",
			drawer.centerX(size),
			drawer.centerY()+hSize*temp,
		       "FILL");
	}
    } else return;
    if(value>5){
	const temp = Math.min(1.0, value-5.0);
	
	drawer.line(drawer.centerX(size),
		    drawer.centerY(-size),
		    drawer.centerX(size)+hSize*temp,
		    drawer.centerY(-size));
	
	if(value <= 6){
	    drawer.circle(drawer.centerX(size)+hSize*temp,
			  drawer.centerY(-size), 2);
	    drawer.text(this.pa.toString(),
			"14px Arial",
			drawer.centerX(size)+hSize*temp,
			drawer.centerY(-size),
		       "FILL");
	}
    } else return;
    if(value>6){
	const temp = Math.min(1.0, value-6.0);
	
	drawer.line(drawer.centerX(),
		    drawer.centerY(-size),
		    drawer.centerX()+hSize*temp,
		    drawer.centerY(-size));

	if(value <= 7){
	    drawer.circle(drawer.centerX()+hSize*temp,
			  drawer.centerY(-size), 2);
	    drawer.text(this.pa.toString(),
			"14px Arial",
			drawer.centerX()+hSize*temp,
			drawer.centerY(-size),
		       "FILL");
	}
    } else return;
    if(value>7){
	const temp = Math.min(1.0, value-7.0);
	
	drawer.line(drawer.centerX(-size),
		    drawer.centerY(-size),
		    drawer.centerX(-size),
		    drawer.centerY(-size)-hSize*temp);

	if(value <= 8){
	    drawer.circle(drawer.centerX(-size),
			  drawer.centerY(-size)-hSize*temp, 2);
	    drawer.text(this.pa.toString(),
			"14px Arial",
			drawer.centerX(-size),
			drawer.centerY(-size)-hSize*temp,
		       "FILL");
	}
    } else return;
}
App.prototype.drawCursor = function(){
    var drawer  = this.drawer;
    var cursor  = this.cursor;
    
    if(drawer != null && cursor != null){
	drawer.strokeStyle("blue").lineWidth(1);
	drawer.line(drawer.centerX(), drawer.centerY(), this.cursor.x, this.cursor.y);
    }
}
App.prototype.setCursor = function(event){
    var temp = this.drawer.getMousePos(event);
    if(temp!=null) this.cursor = temp;
}
