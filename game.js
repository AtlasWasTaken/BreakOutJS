//var c = document.getElementById('myCanvas');
//var ctx = c.getContext('2d');

//Funktion der tegner 3 objekter. Step #1.
/*function init() {
	var c = document.getElementById('myCanvas');
	var ctx = c.getContext('2d');
	
	ctx.beginPath();
	ctx.rect(20, 40, 50, 50);
	ctx.rect(300,20,50,50);
	ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
	ctx.stroke();
	ctx.closePath();

	ctx.beginPath();
	ctx.arc(240, 160, 20, 0, Math.PI*2,false);
	ctx.fillStyle='green';
	ctx.fill();
	ctx.closePath();
	
	ctx.beginPath();
	ctx.arc(50, 50, 20, 0, Math.PI*2,false);
	ctx.fillStyle='green';
	ctx.fill();
	ctx.closePath();
}*/
var canvas;
var ctx;

var x;
var y;
var dx;
var dy;
var ballRadius = 10;

function init() {
	canvas = document.getElementById("myCanvas");
	ctx = canvas.getContext("2d");
	
	x = canvas.width/2;
	y = canvas.height-30;
	dx = 20;
	dy = 20;
}
//Tegner bolden
function drawBall() {
	ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
//Tegner paddle 
function drawPaddle() {
	canvas = document.getElementById("myCanvas");
	ctx = canvas.getContext("2d");
	
	var paddleHeight = 10;
	var paddleWidth = 75;
	var paddleX = (canvas.width-paddleWidth)/2;
	
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight-5, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
//Tegner på canvas on repeat. Tjekker for collisions.
function draw() {
	canvas = document.getElementById("myCanvas");
	ctx = canvas.getContext("2d");
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBall();
	drawPaddle();
	
	if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
		dy = -dy;
	}
	if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
		dx = -dx;
	}
	
	x += dx;
    y += dy;
}
//Controls
function controlHandler() {
	
}

//Kører draw() functionen i et x millisekunder interval, hvor x er talværdienm bag
setInterval(draw, 10);