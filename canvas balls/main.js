
const canvas = document.querySelector('.my_canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let radius = 40;
let balls = [];

canvas.addEventListener("click", function(e){
	let [x, y] = [e.offsetX, e.offsetY] //get position of where mouse clicked 
	let dirX = Math.random() * 10 - 5; // -5 <= dirX <= 5
	let dirY = Math.random() * 10 - 5; // -5 <= dirY <= 5
	balls.push([x, y, dirX, dirY]);
	console.log(balls);
});

function draw_one_ball(x, y){
	//context.createRadialGradient(x0,y0,r0,x1,y1,r1);
	let rg = ctx.createRadialGradient(x - 15, y - 15, 0, x, y, radius);
	rg.addColorStop(0, 'white');
	rg.addColorStop(1, 'blue');

	ctx.fillStyle = rg;
	ctx.beginPath();
	//ctx.arc(x,y,r,sAngle,eAngle,counterclockwise)
	ctx.arc(x, y, radius, 0, 2*Math.PI, false); 
	ctx.fill();
}


// draw all balls
function draw() {
	for (let i = 0; i < balls.length; i++) {
		let [x, y, dirX, dirY] = balls[i];
		draw_one_ball(x, y);
	}
}

function bounce_on_edge(n){
	let [x, y, dirX, dirY] = balls[n];
	if (x + dirX <= radius || x + dirX >= canvas.width - radius) {
		dirX *= -1;
	}
	if (y + dirY <= radius || y + dirY >= canvas.height - radius) {
		dirY *= -1;
	}
	return [x, y, dirX, dirY];
}

function bounce_on_balls(n) {
	let [x, y, dirX, dirY] = balls[n];
	for (let i = 0; i < balls.length; i++){
		let [x1, y1, dirX1, dirY1] = balls[i];
		let dist = Math.sqrt((x1 - x)**2 + (y1 - y)** 2);
		if (n != i && dist <= radius * 2){
			dirX *= -1;
			dirY *= -1;
		}
	}
	return [x, y, dirX, dirY];
}

function move_one_step(n) {
	let [x, y, dirX, dirY] = balls[n];
	x += dirX;
	y += dirY;
	return [x, y, dirX, dirY];
}

function geo(x1, y1, x2, y2, dist, step){
	let tmp = (2 * radius + dist) / (2 * dist);
	if (x1 == x2 && y1 == y2) {
		// we can just delete this ball
	}
	if (x1 < x2 && y1 == y2) {
		x1 -= step;
		x2 += step;
	}

	if (x1 > x2 && y1 == y2) {
		x1 += step;
		x2 -= step;
	}

	if (x1 == x2 && y1 < y2) {
		y1 -= step;
		y2 += step;
	}

	if (x1 == x2 && y1 > y2) {
		y1 += step;
		y2 -= step;
	}

	if (x1 < x2 && y1 > y2) {
		a = x2 - (x2 - x1) * tmp;
		b = y2 + (y1 - y2) * tmp;
		c = x1 + (x2 - x1) * tmp;
		d = y1 - (y1 - y2) * tmp;		
		x1 = a;
		y1 = b;
		x2 = c;
		y2 = d;

	}

	if (x1 < x2 && y1 < y2) {
		a = x2 - (x2 - x1) * tmp;
		b = y2 - (y2 - y1) * tmp;
		c = x1 + (x2 - x1) * tmp;
		d = y1 + (y2 - y1) * tmp;
		x1 = a;
		y1 = b;
		x2 = c;
		y2 = d;
	}

	if (x1 > x2 && y1 < y2) {
		a = x2 - (x1 - x2) * tmp;
		b = y2 + (y2 - y1) * tmp;
		c = x1 + (x1 - x2) * tmp;
		d = y1 - (y2 - y1) * tmp;
		x1 = a;
		y1 = b;
		x2 = c;
		y2 = d;
	}
 
	if (x1 > x2 && y1 > y2) {
		a = x2 - (x1 - x2) * tmp;
		b = y2 - (y1 - y2) * tmp;
		c = x1 + (x1 - x2) * tmp;
		d = y1 + (y1 - y2) * tmp;
		x1 = a;
		y1 = b;
		x2 = c;
		y2 = d;
	}

	return [x1, y1, x2, y2];
}

function space_them(n) {
	let [x, y, dirX, dirY] = balls[n];
	for (let i = 0; i < balls.length; i++){
		let [x1, y1, dirX1, dirY1] = balls[i];
		let dist = Math.sqrt((x1 - x)**2 + (y1 - y)** 2);
		if ( dist < 2 * radius) {
			let step = (2 * radius - dist) / 2;
			if (x > x1 || x == x1 && y > y1) {
				[x, y, x1, y1] = geo(x1, y1, x, y, dist, step);
			}else {
				[x, y, x1, y1] = geo(x, y, x1, y1, dist, step);
			}
			balls[n] = [x, y, dirX, dirY];
			balls[i] = [x1, y1, dirX1, dirY1];
		}
	}
	return [x, y, dirX, dirY];
}

function rescue_them(n) {
	let [x, y, dirX, dirY] = balls[n];
	if (x + dirX < radius){
		x = radius;
	}
	if (x + dirX > canvas.width - radius){
		x = canvas.width - radius;
	}
	if (y + dirY < radius){
		y = radius;
	}
	if (y + dirY > canvas.height - radius ){
		y = canvas.height - radius;
	}
	return [x, y, dirX, dirY];
}

function move() {
	for (let n = 0; n < balls.length; n++) {
		balls[n] = move_one_step(n);
	}
	for (let n = 0; n < balls.length; n++) {
		balls[n] = bounce_on_balls(n);
		balls[n] = bounce_on_edge(n);
	}
	for (let n = 0; n < balls.length; n++) {
		balls[n] = space_them(n);
		balls[n] = rescue_them(n);
	}
}

//clear previous balls after moving
function clear() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}


function run(){
	clear();
	draw();
	move();
}
 
setInterval(run, 30);



