//Javascript for Breakout spil
//De fleste variabler bliver defineret uden værdier globalt, og værdierne gives så inde i funktioner.
//Først: Canvas-elementet i HTML
var canvas;
var ctx;
//Variabler for bolden og bevælgelse af bolden
var x;
var y;
var ddx;
var dx;
var dy;
var ballRadius = 10;
//Variabler for spillets 'paddle'.
var paddleHeight;
var paddleWidth;
var paddleX;
//Variabler for kontrollering af spillets 'paddle'.
var pmx;
var rightPressed;
var leftPressed;
//Variabler for 'bricks', altså 'målene' i spillet.
var brickRowCount;
var brickColumnCount;
var brickWidth;
var brickHeight;
var brickPadding;
var brickOffsetTop;
var brickOffsetLeft;

var bricks;

//Score-variabel
var score = 0;
//Liv-variabel
var lives = 3;

//init() funktionen loader onload, så alting herinde vil loade samtidig med siden.
function init() {
	canvas = document.getElementById("myCanvas");
	ctx = canvas.getContext("2d");
	
	rightPressed = false;
	leftPressed = false;
	
	touchCtrl();
	kbCtrl();
	
	x = canvas.width/2;
	y = canvas.height-30;
	ddx = 5;
	dx = Math.random()*(ddx+ddx)-ddx;
	dy = -4;
	if(dx < 0.5 && dx > -0.5) {
		document.location.reload();
	}
	
	paddleHeight = 10;
	paddleWidth = 75;
	paddleX = (canvas.width-paddleWidth)/2;
	
	brickRowCount = 4;
	brickColumnCount = 6;
	brickWidth = 64;
	brickHeight = 15;
	brickPadding = 8;
	brickOffsetTop = 30;
	brickOffsetLeft = 24;
	
	//Brick-array skabes her.
	bricks = [];
	for(c=0; c<brickColumnCount; c++) {
		bricks[c] = [];
		for(r=0; r<brickRowCount; r++) {
			bricks[c][r] = { x: 0, y: 0, status: 1 };
		}
	}
	
	draw();
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
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight-5, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
//Tegner bricks
function drawBricks() {
	for(c=0; c<brickColumnCount; c++) {
		for(r=0; r<brickRowCount; r++) {
			if(bricks[c][r].status == 1) {
				var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
				var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
				
				bricks[c][r].x = brickX;
				bricks[c][r].y = brickY;
				
				ctx.beginPath();
				ctx.rect(brickX, brickY, brickWidth, brickHeight);
				ctx.fillStyle = "#0095DD";
				ctx.fill();
				ctx.closePath();
			}
		}
	}
}
//Function for at tjekke om bolden overlapper en brick.
function collisionDetection() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
			if(b.status == 1) {
				if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
					dy = -dy;
					b.status = 0;
					score++;
					if(score == brickColumnCount*brickRowCount) {
						alert("You win!");
						document.location.reload();
					}
				}
			}
        }
    }
}
//Tegner og beregner spillerens score.
function drawScore() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Score: " + score, 8, 20)
}
//Tegner og beregner spillerens liv.
function drawLives() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Lives: " + lives, canvas.width-65, 20)
}

//Keyboard controls
function kbCtrl() {
	document.addEventListener("keydown", keyDownHandler, false);
	document.addEventListener("keyup", keyUpHandler, false);
}
function keyDownHandler(e) {
	if(e.keyCode ==39) {
		rightPressed = true;
	}
	else if(e.keyCode == 37) {
		leftPressed = true;
	}
}
function keyUpHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = false;
	}
	else if(e.keyCode == 37) {
		leftPressed = false;
	}
}
//Touch controls
function touchCtrl() {
	document.addEventListener("touchstart", pMoveStart, false);
	document.addEventListener("touchend", pMoveEnd, false);
}
function pMoveStart() {
	pmx = event.touches[0].pageX;
	if(pmx > canvas.width/2) {
		rightPressed = true;
	}else if(pmx < canvas.width/2) {
		leftPressed = true;
	}
}
function pMoveEnd() {
	if(pmx > canvas.width/2){
		rightPressed = false;
	}
	else if(pmx < canvas.width/2){
		leftPressed = false;
	}
}
//Sletter og tegner på canvas on repeat. 
//Tjekker for collisions.
function draw() {
	//Første linje 'clearer' canvas-elementet, så der ikke er nogle tegninger gemt fra forrige loop.
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBricks();
	drawBall();
	drawPaddle();
	drawScore();
	drawLives();
	//Tjekker for collison
	collisionDetection();
	//Vender bolden hvis den rører ved en af siderne på canvas-elementet (x-axis collision).
	if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
		dx = -dx;
	}
	//Vender bolden hvis den rører toppen af canvas-elementet (+y.axis collision).
	if(y + dy < ballRadius) {
		dy = -dy;
	}
	//Hvis bolden rammer 'paddle' boksen vender den vertikalt
	else if(y + dy > canvas.height-ballRadius-4) {
		if(x > paddleX && x < paddleX + paddleWidth) {
			dy = -dy;
		}
		//Hvis ikke får man en 'Game over' besked, og siden reloader så man kan spille igen.
		else {
			lives--;
			if(!lives) {
				alert("Game Over. Try again?");
				document.location.reload();
			}
			else {
				x = canvas.width/2;
                y = canvas.height-30;
                dx = 3;
                dy = -3;
                paddleX = (canvas.width-paddleWidth)/2;
			}
		}
	}
	//Flytter 'paddle' når input er givet.
	if(rightPressed && paddleX < canvas.width-paddleWidth) {
		paddleX += 5;
	}
	else if(leftPressed && paddleX > 0) {
		paddleX -= 5;
	}
	//Flyter boldens placering til næste loop - virker som 'bevægelse'.
	x += dx;
    y += dy;
	
	//Gentager draw() funktionen når 
	requestAnimationFrame(draw);
}