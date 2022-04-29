var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d'); //create a 2d drawing object for canvas object
var radius = canvas.height / 2; //calculate clock radius using height of canvas - canvas height divided by 2
ctx.translate(radius, radius); //remap position of x and y axis to centre of canvas (0,0)
radius = radius * 0.90 // reduce clock radius to 90 percent so that when the clock is drawn, it's inside the canvas.
setInterval(drawClock, 1000); // this is the function call! set at every 1 second

// function to draw clock
function drawClock() {
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
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

function drawNumbers(ctx, radius) {
    var ang; 
    var num;
    ctx.font = radius*0.15 + 'px arial'; //set font size to 15 percent of radius
    ctx.textBaseline='middle'; // set text alignment to middle of print position
    ctx.textAlign='center'; // set text alignment to center of print position
    // calculating print position for 12 numbers to 85 percent of the radius and have them rotate(rotate method)
    // translate is used to remap on x and y axis of canvas
    for(num = 1; num < 13; num++){
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius*0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius*0.85);
        ctx.rotate(-ang);
    }
}

function drawTime(ctx, radius) {
    var now = new Date(); //current date
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();

    // calculate the angle of the hour hand and draw it at 50 percent of the radius and with (0.07 of radius)
    //hour
    hour = hour%12;
    hour = (hour*Math.PI/6) +
    (minute*Math.PI/(6*60)) +
    (second*Math.PI/(360*60));
    drawHand(ctx, hour, radius*0.5, radius*0.07);

    // calculate and draw minute hand
    //minute
    minute=(minute*Math.PI/30) + (second*Math.PI/(30*60));
    drawHand(ctx, minute, radius*0.8, radius*0.07);

    // calulate and draw seconds hand
    //second
    second=(second*Math.PI/30);
    drawHand(ctx, second, radius*0.9, radius*0.02);
}

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}