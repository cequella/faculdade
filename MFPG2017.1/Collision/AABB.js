class AABB extends Collider {
	
	constructor(center, dimen){
		super(center);
		this.dimen = {
			width:   dimen.width,
			height:  dimen.height,
			hWidth:  dimen.width/2.0,
			hHeight: dimen.height/2.0
		};
		this.color = "white";
		
		this.active = false;
	}
	
	get bounds(){
		return {left:   this.center.x - this.dimen.hWidth, 
				right:  this.center.x + this.dimen.hWidth,
				top:    this.center.y - this.dimen.hHeight,
				bottom: this.center.y + this.dimen.hHeight};
	}
	get point(){
		return [
			{x: -this.dimen.hWidth, y: -this.dimen.hHeight},
			{x: -this.dimen.hWidth, y: this.dimen.hHeight},
			{x: this.dimen.hWidth,  y: this.dimen.hHeight},
			{x: this.dimen.hWidth,  y: -this.dimen.hHeight}
		];
	}
	
	draw(){
		if(this.active){
			fill("green");
		} else {
			fill(this.color);
		}
		noStroke();
		rect(this.center.x-this.dimen.hWidth, this.center.y-this.dimen.hHeight, 
			 this.dimen.width,                this.dimen.height);
		
		if(this.active){
			fill("white");
		} else {
			fill("black");
		}
		text("AABB",
			 this.center.x - textWidth("AABB")/2.0,
			 this.center.y);
	}
	collision(collider){
		
		if(collider instanceof AABB){
			this.active = this.checkAABBCollision(collider);
		} else if(collider instanceof OBB){
			this.active = this.checkObbCollision(collider);
		} else if(collider instanceof Sphere){
			this.active = this.checkSphereCollision(collider)
		}
	}
	
	checkAABBCollision(aabb){
		const THISbounds = this.bounds;
		const AABBbounds = aabb.bounds;
		
		if(THISbounds.right  < AABBbounds.left)   return false;
		if(THISbounds.left   > AABBbounds.right)  return false;
		if(THISbounds.bottom < AABBbounds.top)    return false;
		if(THISbounds.top    > AABBbounds.bottom) return false;
		
		return true;
	}
	checkObbCollision(obb){
		var P1 = this.point;
		var P2 = obb.point;
		
		function translatePoints(center1, center2){
			for(var i=0; i<4; i++){
				P1[i].x+=center1.x;
				P1[i].y+=center1.y;
				P2[i].x+=center2.x;
				P2[i].y+=center2.y;
			}
		}
		translatePoints(this.center, obb.center);
		
		var axes = new Array();
		function calcAxes(){
			var c1 = SAT.getAxis(P1);
			var c2 = SAT.getAxis(P2);
			for(var i=0; i<4; i++) axes.push(c1[i], c2[i]);
		}
		calcAxes();
		
		for (var i=0; i < axes.length; i++) {
			var axis = axes[i];

			var p1 = SAT.project(P1, axis);
			var p2 = SAT.project(P2, axis);

			if (p1.left>p2.right || p1.right<p2.left) return false;
		}
		return true;
	}
	checkSphereCollision(sphere) {
		var difference = {x: sphere.center.x - this.center.x, 
						  y: sphere.center.y - this.center.y};
		
		const clamped = {x: clamp(difference.x, -this.dimen.hWidth,  this.dimen.hWidth),
						 y: clamp(difference.y, -this.dimen.hHeight, this.dimen.hHeight)};
		const closest = {x: this.center.x + clamped.x,
						 y: this.center.y + clamped.y}
		
		difference = {x: closest.x - sphere.center.x,
					  y: closest.y - sphere.center.y};
		
		const delta = pow(difference.x, 2.0)+pow(difference.y, 2.0);
		return ( delta<pow(sphere.radius, 2.0) );
	}
}
