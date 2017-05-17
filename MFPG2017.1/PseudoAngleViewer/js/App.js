function setup(){
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");

    var min = Math.min(canvas.width, canvas.height);
    drawAxis(min/4);
}

function drawAxis(size){
    // Vertical Line
    context.moveTo(canvas.width/2, 0);
    context.lineTo(canvas.width/2, canvas.height);
    
    // Horizontal Line
    context.moveTo(0, canvas.height/2);
    context.lineTo(canvas.width, canvas.height/2);

    // Draw Square
    context.moveTo(canvas.width/2-size, canvas.height/2-size);
    context.lineTo(canvas.width/2+size, canvas.height/2-size);
    context.lineTo(canvas.width/2+size, canvas.height/2+size);
    context.lineTo(canvas.width/2-size, canvas.height/2+size);
    context.lineTo(canvas.width/2-size, canvas.height/2-size);
    
    // Draw Line
    context.stroke();
}
