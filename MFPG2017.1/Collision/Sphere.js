class Sphere extends Collider {
	
	constructor(center, radius){
		super(center);
		this.radius = radius;
  		this.color = "white";
		
		this.active = false;
	}
	
	draw(){
		if(this.active){
			fill("green");
		} else {
			fill(this.color);
		}
		noStroke();
		ellipse(this.center.x, this.center.y, 2.0*this.radius, 2.0*this.radius);
		
		if(this.active){
			fill("white");
		} else {
			fill("black");
		}
		text("Sphere",
			 this.center.x - textWidth("Sphere")/2.0,
			 this.center.y);
	}
	collision(collider){
   		if(collider instanceof AABB || collider instanceof OBB){
			this.active = collider.checkSphereCollision(this);
		} else if(collider instanceof Sphere){
			this.active = this.checkSphereCollision(collider);
		}
	}
	
	checkSphereCollision(sphere){
		const dx2 = pow(this.center.x-sphere.center.x, 2.0);
		const dy2 = pow(this.center.y-sphere.center.y, 2.0);
		const radius = this.radius+sphere.radius;
		
		return ( dx2+dy2 < pow(radius, 2.0) );
	}
}
