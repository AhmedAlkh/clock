var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d'); //create a 2d drawing object for canvas object
var radius = canvas.height / 2; //calculate clock radius using height of canvas - canvas height divided by 2
ctx.translate(radius, radius); //remap position of x and y axis to centre of canvas (0,0)
radius = radius * 0.90 // reduce clock radius to 90 percent so that when the clock is drawn, it's inside the canvas.

drawClock(); // call function

// function to draw clock
function drawClock() {
    drawFace(ctx, radius);
}

function drawFace(ctx, radius) {
    var grad; 
    // these 4 lines draw the white circle for the face of the clock
    ctx.beginPath(); // begins path or resets current path
    ctx.arc(0, 0, radius, 0, 2*Math.PI);  // arc method create arc/curve to create circle, params draw circle and postion it.
    ctx.fillStyle ='white';  // color that will fill the circle, the clock will have a white face.
    ctx.fill(); // fill the current path of the drawing, default color is black.

    grad = ctx.createRadialGradient(0, 0, radius*0.95, 0, 0, radius*1.05); // creating radial gradient
    // create 3 color stops corresponding with inner, middle, outer edge of clock
    grad.addColorStop(0, '#333');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, '#333'); // colorstop creates 3d affect

    ctx.strokeStyle = grad; // define gradient as stroke style of drawing object
    ctx.lineWidth = radius*0.1; // define line width of drawing object
    ctx.stroke(); // use stroke method to draw circle

    // draw clock centre
    ctx.beginPath();
    ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
}