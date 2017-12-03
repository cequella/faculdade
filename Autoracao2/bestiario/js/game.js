var Game = (function(){
	// Constructor
	function Game(){
		this.canvas       = new Canvas("game");
		this.player       = new Player(this.canvas, true);
		this.pc           = new Player(this.canvas, false);
		this.mode         = new Uint8Array(5);
		this.scoreboard   = new Scoreboard();
		this.needUpdate   = true;
		this.xmlManager   = new XMLManager("assets/cardList.xml", setup.bind(this));
		this.currentRound = 0;
	}

	// Private
	function setup(){
		var deck = genDeck.call(this);
		var context = this.canvas.context;
		
		// Create card list
		this.player.setHand(deck);
		this.pc.setHand(deck);

		requestAnimationFrame( draw.bind(this) );
	}
	function draw(){
		var context = this.canvas.context;
		context.fillStyle = "black";
		context.fillRect(0, 0, context.canvas.width, context.canvas.height);

		selectCards.call(this, this.mode[this.currentRound]%4);
		//battle.call(this, 0, this.mode[this.currentRound]%4);
		//showScoreboard.call(this, "0000");
		
		requestAnimationFrame( draw.bind(this) );
	}
	function selectCards(mode){
		this.player.show();

		var context = this.canvas.context;
		context.font = "50px Arial";
		context.fillStyle = "white";

		var status;
		switch(mode){
		case 0:
			status = "Power";
			break;
		case 1:
			status = "Speed";
			break;
		case 2:
			status = "Thoughness";
			break;
		case 3:
			status = "Charisma"
			break;
		}

		var width = context.measureText(status).width
		context.fillText(status, (context.canvas.width-width)/2, 100);
		context.fillStyle = "transparent";
	}
	function battle(userIndex, status){
		var userSelection = this.player.getCard(userIndex);
		var pcSelection = this.pc.getCard(0);
		var context = this.canvas.context;

		var horizontalCenter = (context.canvas.width -CARD_WIDTH)/2;
		
		pcSelection.setPosition(horizontalCenter, 60);
		userSelection.setPosition(horizontalCenter, context.canvas.height -CARD_HEIGHT -60);
		
		userSelection.draw();
		pcSelection.draw();

		// Check battle
		if( userSelection.check(pcSelection, status)>0 ){
		} else {
		}
	}
	function showScoreboard(score){
		var context = this.canvas.context;
		var width;
		context.fillStyle = "white";

		// Label
		context.font = "50px Arial";
		width = context.measureText("Score").width;
		context.fillText("Score", (context.canvas.width-width)/2, 100);
		
		// Score
		context.font = "80px Arial";
		width = context.measureText(score).width;
		context.fillText(score, (context.canvas.width-width)/2, 180);

		// Score table
		this.scoreboard.draw(this.canvas, 220);

		context.fillStyle = "transparent";
	}
	function genDeck(){
		var doc = this.xmlManager.xml;
		var cardList = doc.getElementsByTagName("card");

		// Create a temp random index array
		var index = new Uint16Array(10);
		window.crypto.getRandomValues(index)
		window.crypto.getRandomValues(this.mode)

		// Create a deck list
		var deck = new Array();
		for(i=0; i<index.length; i++){
			deck[i] = cardList[ index[i]%cardList.length ];
		}

		return deck;
	}

	// Public
	Game.prototype.removeCard = function(index){
		this.player.discard(index)
		this.pc.discard(index);
	}

	return Game;
})();

var game;
(function(){
	window.addEventListener("load", function(){
		game = new Game();
	}, false);
})()
