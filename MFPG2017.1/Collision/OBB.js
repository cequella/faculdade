class OBB extends Collider {
	
	constructor(center, dimen, angle){
		super(center);
		
		this.t_dimen = {
			width:   dimen.width,
			height:  dimen.height,
			hWidth:  dimen.width/2.0,
			hHeight: dimen.height/2.0
		};
		this.angle = angle;
		this.color = "white";
		
		this.active = false;
	}
	
	get dimen(){
		return this.t_dimen;
	}
	get point(){
		const dimen = this.dimen;
		
		var out = [
			{x: -dimen.hWidth, y: -dimen.hHeight},
			{x: dimen.hWidth,  y: -dimen.hHeight},
			{x: dimen.hWidth,  y: dimen.hHeight},
			{x: -dimen.hWidth, y: dimen.hHeight},
		];
		
		const cosAngle = cos(this.angle);
		const sinAngle = sin(this.angle);
		
		for(var i=0; i<out.length; i++){
			var temp = out[i];
			
			const tempX = temp.x*cosAngle + temp.y*sinAngle;
			const tempY = temp.y*cosAngle - temp.x*sinAngle;

			out[i] = {x: tempX, 
					  y: tempY};
		}
		
		return out;
	}
	
	set dimen(dimen){
		this.t_dimen = {
			width:   dimen.width,
			height:  dimen.height,
			hWidth:  dimen.width/2.0,
			hHeight: dimen.height/2.0
		};
	}
	
	draw(){
		if(this.active){
			fill("green");
		} else {
			fill(this.color);
		}
		noStroke();
		beginShape();
		for(var i=0; i<this.point.length; i++){
			vertex(this.point[i].x +this.center.x, this.point[i].y +this.center.y);
		}
		endShape();
		
		if(this.active){
			fill("white");
		} else {
			fill("black");
		}
		text("OBB",
			 this.center.x - textWidth("OBB")/2.0,
			 this.center.y);
	}
	
	collision(collider){
		if(collider instanceof AABB){
			this.active = collider.checkObbCollision(this);
		} else if(collider instanceof OBB){
			this.active = this.checkObbCollision(collider);
		} else if(collider instanceof Sphere){
			this.active = this.checkSphereCollision(collider);
		}
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
	checkSphereCollision(sphere){
		// Create vector from OBB center to AABB center
		var delta = {x: this.center.x-sphere.center.x,
					 y: this.center.y-sphere.center.y};
		
		// Transpose 'delta' to OBB vetorial space. Then, rotate by -angle
		function setDelta(angle){
			const sinAngle = sin(-angle);
			const cosAngle = cos(-angle);
			const tempX = delta.x*cosAngle + delta.y*sinAngle;
			const tempY = delta.y*cosAngle - delta.x*sinAngle;

			delta = {x: tempX, y: tempY};
		}
		setDelta(this.angle);
		
		// Now the new delta is the center of a new sphere, and the new OBB has center in origin (vetorial space)
		const tempAABB = new AABB({x: 0.0, y: 0.0}, this.dimen);
		const tempSphere = new Sphere(delta, sphere.radius);
		
		// Check collision
		return tempAABB.checkSphereCollision(tempSphere);
	}
}
