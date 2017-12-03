var Scoreboard = (function(){
	// Constructor
	function Scoreboard(){
		this.content = new Array(5);

		read.call(this);
	}

	// Public
	function read(){
		for(i=0; i<5; i++){
			this.content[i] = {
				nick: window.localStorage.getItem("player"+i+"name"),
				score: window.localStorage.getItem("player"+i+"score")
			}
		}
	}
	Scoreboard.prototype.write = function(){
		for(i=0; i<5; i++){
			window.localStorage.setItem("player"+i+"name", this.content[i].nick);
			window.localStorage.setItem("player"+i+"score", this.content[i].score);
		}
	}
	Scoreboard.prototype.addScore = function(nick, score){
		for(i=0; i<4; i++){
			if(score>this.content[i].score && score<this.content[i+1].score){
				this.content[i] = {
					nick: nick,
					score: score
				}
				return
			}
		}
		if(score > this.content[4].score) {
			this.content[4] = {
				nick: nick,
				score: score
			}
		}
	}
	Scoreboard.prototype.draw = function(canvas, y){
		var context = canvas.context;
		context.font = "20px Arial";
		for(i=0; i<5; i++){
			width = context.measureText(this.content[i].nick).width;
			context.fillText(this.content[i].nick, context.canvas.width/2-width-10, y+i*20);
			width = context.measureText(this.content[i].score).width;
			context.fillText(this.content[i].score, context.canvas.width/2+10, y+i*20);
		}
	}

	return Scoreboard;
})();
