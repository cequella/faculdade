window.addEventListener("load", canvasApp, false);
function canvasApp() {
    var app = new App("canvas");

    function loop(){
	app.draw();
	window.requestAnimationFrame(loop);
    }
    loop();
}
