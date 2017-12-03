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
		this.cache        = null
		this.timer        = 0;
		this.points       = 0;
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

		if(this.cache == null){
			if(this.currentRound<5){
				selectCards.call(this, this.mode[this.currentRound]%4);
			} else {
				showScoreboard.call(this);
			}
		} else {
			battle.call(this, this.cache, this.mode[this.currentRound]%4);
		}
		
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

		// Show Points
		context.font = "30px Arial";
		context.fillStyle = "white";
		context.fillText(""+this.points, 0, 30);

		// Show Rounds
		context.font = "30px Arial";
		context.fillStyle = "white";
		context.fillText(""+this.currentRound, 0, 60);
		
		if(this.canvas.cursor.click){
			this.cache = this.player.getClicked();
		}
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

		var points = userSelection.check(pcSelection, status);
		
		// Show winner
		this.timer++;
		if(this.timer > 60) {
			context.font = "100px Arial";
			context.fillStyle = "white";
			if( points>0 ){
				context.fillText("WIN", 100, 400);
				context.fillText(""+points, 100, 500);
			} else {
				context.fillText("LOSE", 100, 400);
				context.fillText(""+points, 100, 500);
			}
			context.fillStyle = "transparent";
		}

		// Back to Game
		if(this.timer > 120) {
			this.points += points;
			this.player.discard(userIndex);
			this.pc.discard(0);
			this.currentRound++;
			this.canvas.cursor.click = false;
			this.cache = null;
			this.timer = 0;
		}
	}
	function showScoreboard(){
		var context = this.canvas.context;
		var width;
		context.fillStyle = "white";

		// Label
		context.font = "50px Arial";
		width = context.measureText("Score").width;
		context.fillText("Score", (context.canvas.width-width)/2, 100);
		
		// Score
		context.font = "80px Arial";
		width = context.measureText(""+this.points).width;
		context.fillText(""+this.points, (context.canvas.width-width)/2, 180);

		// Score table
		this.scoreboard.addScore(nickname.value, this.points);
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

	return Game;
})();

var game;
var nickname;
(function(){
	window.addEventListener("load", function(){
		nickname = document.getElementById("nick");
		game = new Game();
	}, false);
})()
