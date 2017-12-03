var Player = (function(){
	// Constructor
	function Player(canvas, isPlayer){
		this.canvas = canvas;
		this.hand = new Array(5);
		this.needUpdate = true;
		this.points = 0;
		this.isPlayer = isPlayer;
	}

	// Public
	Player.prototype.setHand = function(deck){
		if(this.isPlayer){
			for(i=0; i<deck.length/2; i++){
				this.hand[i] = new Card(this.canvas, new CardWrapper(deck[i]), true);
			}
		} else {
			var context = this.canvas.context;
			var horizontalCenter = (context.canvas.width -CARD_WIDTH)/2;
			for(i=0; i<deck.length/2; i++){
				this.hand[i] = new Card(this.canvas, new CardWrapper(deck[i+deck.length/2]), false);
				this.hand[i].setPosition(horizontalCenter, 60);
			}
		}
	}
	Player.prototype.updatePosition = function(){
		var context = this.canvas.context;
		var leftMargin = (context.canvas.width-this.hand.length*CARD_WIDTH)/2;
		for(i=0; i<this.hand.length; i++){
			this.hand[i].setPosition(leftMargin+CARD_WIDTH*i, context.canvas.height-CARD_HEIGHT+20);
		}
		this.needUpdate = false;
	}
	Player.prototype.show = function(){
		if(this.isPlayer){
			if(this.needUpdate) this.updatePosition();
			for(i=0; i<this.hand.length; i++){
				this.hand[i].draw();
			}
		} else {
			this.hand[0].draw();
		}
	}
	Player.prototype.getCard = function(index){
		return this.hand[index];
	}
	Player.prototype.discard = function(index){
		this.hand.splice(index, 1);
		this.needUpdate = true;
	}
	Player.prototype.getClicked = function(){
		for(i=0; i<this.hand.length; i++){
			if(this.hand[i].clicked) return i;
		}
	}
	
	return Player;
})();
