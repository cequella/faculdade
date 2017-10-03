var context;

function start(){
    var canvas = document.getElementById("game");
    context = canvas.getContext("2d");

    // Load image
    var img = new Image;
    img.onload = function(){
	context.drawImage(this, (canvas.width-400)/2, (canvas.height-600)/2, 400, 600);
    }
    img.src = "./assets/img/RicFlair_SC.png";
    
    context.fillRect(0, 0, canvas.width, canvas.height);
}
