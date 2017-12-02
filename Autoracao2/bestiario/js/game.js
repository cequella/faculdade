(function(){
	window.addEventListener("load", start, false);
})()

var canvas;
var card = new Array();
var xmlManager;

function test(){
	var doc = xmlManager.xml;

	var cardList = doc.getElementsByTagName("card");
	var index = new Uint16Array(10);
	window.crypto.getRandomValues(index)

	var deck = new Array();
	for(i=0; i<index.length; i++){
		deck[i] = cardList[ index[i]%cardList.length ];
	}
	console.log(deck);

	for(i=0; i<index.length/2; i++){
		var src = "assets/img/cards/"+deck[i].children[0].textContent+".png";
		card[i] = new Card(canvas, src);
		card[i].setPosition(100+128*i, 600-170);
	}
}

function setup(){
	xmlManager = new XMLManager("assets/cardList.xml", test);
	
	canvas = new Canvas("game");
}
function draw(){
	var context = canvas.getContext();
	context.fillStyle = "black";
	context.fillRect(0, 0, context.canvas.width, context.canvas.height);

	for(i=0; i<card.length; i++){
		card[i].draw();
	}

	requestAnimationFrame(draw);
}

function start(){
	setup();
	requestAnimationFrame(draw);
} 
