var Scoreboard = (function(){
	// Constructor
	function Scoreboard(){
		this.content = new Array(5);

		read.call(this);
	}

	// Public
	function read(){
		for(i=0; i<5; i++){
			var scoremark;
			if(window.localStorage.getItem("player"+i+"name") != null){
				scoremark = {
					nick: window.localStorage.getItem("player"+i+"name"),
					score: window.localStorage.getItem("player"+i+"score")
				};
			} else {
				scoremark = {nick: "---", score: 0 };
			}
			this.content[i] = scoremark;
		}
	}
	function write(){
		for(i=0; i<5; i++){
			window.localStorage.setItem("player"+i+"name", this.content[i].nick);
			window.localStorage.setItem("player"+i+"score", this.content[i].score);
		}
	}
	Scoreboard.prototype.addScore = function(nick, score){
		if(score < this.content[0].score) return;
		
		var scoremark = {nick: nick, score: score};
		for(i=0; i<4; i++){
			if(score>this.content[i].score && score<this.content[i+1].score){
				this.content.splice(0, 1); // Remove last
				this.content.splice(i, 0, scoremark);
				write.call(this);
				return;
			}
		}
		if(score>this.content[4].score){
			this.content.splice(0, 1); // Remove last
			this.content.splice(4, 0, scoremark);
			write.call(this);
		}
	}
	Scoreboard.prototype.draw = function(canvas, y){
		var context = canvas.context;
		context.font = "20px Arial";
		for(i=0; i<5; i++){
			var nick = this.content[4-i].nick;
			var score = this.content[4-i].score;

			width = context.measureText(nick).width;
			context.fillText(nick, context.canvas.width/2-width-10, y+i*20);
			width = context.measureText(score).width;
			context.fillText(score, context.canvas.width/2+10, y+i*20);
		}
	}

	return Scoreboard;
})();
