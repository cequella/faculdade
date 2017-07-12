
/*
  CÓDIGO EM PROCESSING PJ5
  TODO: Migrar para JS puro
*/

const MESSAGE = "Pressione 'Q', 'W', ou 'E' para testar novas primitivas.\n"+
	  "Mouse wheel com Sphere/OBB ativa efeito.";
const SPHERE_GROWTH = 0.05;
const ANGULAR_VELOCITY = 0.003;

var mouseCollider;
var fixedCollider = new Array();

var released = true;

function clamp(value, left, right){
	return max(left, min(right, value));
}

function mouseWheel(event){
	const delta = -event.delta;
	
	if(mouseCollider instanceof Sphere){
		mouseCollider.radius += delta*SPHERE_GROWTH;
		if(mouseCollider.radius<20.0) mouseCollider.radius = 20.0; 
	} else if(mouseCollider instanceof OBB){
		mouseCollider.angle += delta*ANGULAR_VELOCITY;
	}
}
function keyPressed(event){
	if(released){
		released = false;
		
		if(key == 'q' || key == 'Q'){
			mouseCollider = new OBB({x: mouseX, y: mouseY},
									{width: 200.0, height: 100.0},
									QUARTER_PI);
		} else if(key == 'w' || key == 'W') {
			mouseCollider = new AABB({x: mouseX, y: mouseY}, 
									 {width: 100.0, height: 200.0});
		} else if(key == 'e' || key == 'E'){
			mouseCollider = new Sphere({x: mouseX, y: mouseY}, 
									   100.0);
		}
		
		mouseCollider.color = "red";
	}
}
function keyReleased(event){
	released = true;
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	
	fixedCollider.push( new Sphere({x: 150.0, y: 150.0}, 
                                   100.0) );
	fixedCollider.push( new AABB({x: 150.0, y: height - 100.0}, 
								 {width: 200.0, height: 100.0}) );
	fixedCollider.push( new OBB({x: width-200.0, y: height/2.0}, 
								{width: 200.0, height: 100.0},
								QUARTER_PI) );
	
	mouseCollider = new OBB({x: mouseX, y: mouseY},
							{width: 200.0, height: 100.0},
							QUARTER_PI);
	mouseCollider.color = "red";
}
function draw() {
	background(0);
	
	mouseCollider.center = {x: mouseX, y: mouseY};
	
	for(var i=0; i<fixedCollider.length; i++){
		fixedCollider[i].collision(mouseCollider);
		fixedCollider[i].draw();
	}
	mouseCollider.draw();
	
	// Draw Message
	fill("cyan");
	text(MESSAGE,
		 (width-textWidth(MESSAGE) )/2.0, 100.0);
}
