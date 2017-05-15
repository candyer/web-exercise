

const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = '#BADA55';
// ctx.lineJoin = 'round';  //miter/round/bevel
ctx.lineCap = 'round'; // butt/round/square
ctx.lineWidth = 10;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e) {
	if (!isDrawing) return;
	ctx.beginPath();
	ctx.moveTo(lastX, lastY);
	ctx.lineTo(e.offsetX, e.offsetY);
	ctx.stroke();
	[lastX, lastY] = [e.offsetX, e.offsetY];
}

canvas.addEventListener('mousedown', (e) => {
	isDrawing = true;
	[lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

// clear the page
let cleanCanvas = function(){
	ctx.fillStyle = 'white';
	ctx.fillRect(0, 0, window.innerWidth, window.innerWidth); // x,y,w,h
}

let CleanBtn = document.querySelector('.clear');
CleanBtn.addEventListener('click', cleanCanvas);

// change line width and color 
const inputs = document.querySelectorAll('.controls input');

function handleUpdate() {
	ctx.strokeStyle = this.value;
	ctx.lineWidth = this.value;

	const suffix = this.dataset.sizing || '';
	document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}

			inputs.forEach(input => input.addEventListener('change', handleUpdate));
			inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));
