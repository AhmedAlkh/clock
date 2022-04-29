var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d'); //create a 2d drawing object for canvas object
var radius = canvas.height / 2; //calculate clock radius using height of canvas - canvas height divided by 2
ctx.translate(radius, radius); //remap position of x and y axis to centre of canvas (0,0)
radius = radius * 0.90 // reduce clock radius to 90 percent so that when the clock is drawn, it's inside the canvas.

drawClock(); // call function

// function to draw clock
function drawClock() {
    ctx.arc(0,0,radius,0,2*Math.PI);  // arc method create arc/curve to create circle, params draw circle and postion it.
    ctx.fillStyle ='White';  // color that will fill the circle, the clock will have a white face.
    ctx.fill(); // fill the current path of the drawing, default color is black.
}