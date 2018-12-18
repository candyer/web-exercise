function visualizer() {
	
	let file = document.querySelector(".file");
	let audio = document.getElementById("audio");
	
	file.onchange = function() {
		let files = this.files;
		audio.src = URL.createObjectURL(files[0]);
		// audio.load();
		// audio.play();
		let context = new AudioContext();
		let src = context.createMediaElementSource(audio);
		let analyser = context.createAnalyser();

		let canvas = document.getElementById("canvas");
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		let ctx = canvas.getContext("2d");

		src.connect(analyser);
		analyser.connect(context.destination);
		analyser.fftSize = 256;// Must be a power of 2 between 2^5 and 2^15, [32, 32768], Defaults to 2048.

		let bufferLength = analyser.frequencyBinCount;
		let dataArray = new Uint8Array(bufferLength);
		let WIDTH = canvas.width;
		let HEIGHT = canvas.height;

		function renderFrame() {
			requestAnimationFrame(renderFrame);
			analyser.getByteFrequencyData(dataArray);
			ctx.fillStyle = "black";
			ctx.fillRect(0, 0, WIDTH, HEIGHT);
			for (let i = 0; i < bufferLength; i++) {
				let circie_Height = dataArray[i];
				ctx.strokeStyle = `rgb(${circie_Height},${circie_Height},${255})`;
				ctx.beginPath();
				ctx.lineWidth = 2;
				// context.arc(x,y,r,sAngle,eAngle,counterclockwise);
				ctx.arc(WIDTH/2, HEIGHT/2, circie_Height, 0*Math.PI, 2*Math.PI);
				ctx.stroke();
			}
		}
		audio.play();
		renderFrame();

	};
};


visualizer();






















// function visualizer() {
	
// 	let file = document.querySelector(".file");
// 	let audio = document.getElementById("audio");
	
// 	file.onchange = function() {
// 		let files = this.files;
// 		audio.src = URL.createObjectURL(files[0]);
// 		audio.load();
// 		audio.play();
// 		let context = new AudioContext();
// 		let src = context.createMediaElementSource(audio);
// 		let analyser = context.createAnalyser();

// 		let canvas = document.getElementById("canvas");
// 		canvas.width = window.innerWidth;
// 		canvas.height = window.innerHeight;
// 		let ctx = canvas.getContext("2d");

// 		src.connect(analyser);
// 		analyser.connect(context.destination);
// 		analyser.fftSize = 256;

// 		let bufferLength = analyser.frequencyBinCount;
// 		console.log(bufferLength);

// 		let dataArray = new Uint8Array(bufferLength);

// 		let WIDTH = canvas.width;
// 		let HEIGHT = canvas.height;

// 		let barWidth = (WIDTH / bufferLength) * 2;
// 		let barHeight;
// 		let x = 0;

// 		function renderFrame() {
// 			requestAnimationFrame(renderFrame);
// 			analyser.getByteFrequencyData(dataArray);

// 			ctx.fillStyle = "lightgrey";
// 			ctx.fillRect(0, 0, WIDTH, HEIGHT);
// 			for (let i = 0; i < bufferLength; i++) {
// 				barHeight = dataArray[i];
// 				let r = barHeight + (25 * (i/bufferLength));
// 				let g = 250 * (i/bufferLength);
// 				let b = 250;
// 				console.log(barHeight);
// 				ctx.strokeStyle = `rgb(${r},${g},${b})`;
// 				ctx.beginPath();
// 				// context.arc(x,y,r,sAngle,eAngle,counterclockwise);
// 				ctx.arc(WIDTH/2, HEIGHT/2, barHeight + 1, 0*Math.PI, 2*Math.PI);
// 				ctx.stroke();
// 			}
// 		}

// 		audio.play();
// 		renderFrame();
// 	};
// };


// visualizer();
















// window.onload = function() {
	
// 	let file = document.querySelector(".file");
// 	let audio = document.getElementById("audio");
	
// 	file.onchange = function() {
// 		let files = this.files;
// 		audio.src = URL.createObjectURL(files[0]);
// 		audio.load();
// 		audio.play();
// 		let context = new AudioContext();
// 		let src = context.createMediaElementSource(audio);
// 		let analyser = context.createAnalyser();

// 		let canvas = document.getElementById("canvas");
// 		canvas.width = window.innerWidth;
// 		canvas.height = window.innerHeight;
// 		let ctx = canvas.getContext("2d");

// 		src.connect(analyser);
// 		analyser.connect(context.destination);

// 		analyser.fftSize = 256;

// 		let bufferLength = analyser.frequencyBinCount;
// 		console.log(bufferLength);

// 		let dataArray = new Uint8Array(bufferLength);

// 		let WIDTH = canvas.width;
// 		let HEIGHT = canvas.height;

// 		let barWidth = (WIDTH / bufferLength) * 2.5;
// 		let barHeight;
// 		let x = 0;

// 		function renderFrame() {
// 			requestAnimationFrame(renderFrame);

// 			x = 0;

// 			analyser.getByteFrequencyData(dataArray);

// 			ctx.fillStyle = "#000";
// 			ctx.fillRect(0, 0, WIDTH, HEIGHT);

// 			for (let i = 0; i < bufferLength; i++) {
// 				barHeight = dataArray[i];
				
// 				let r = barHeight + (25 * (i/bufferLength));
// 				let g = 250 * (i/bufferLength);
// 				let b = 50;

// 				ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
// 				ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

// 				x += barWidth + 1;
// 			}
// 		}

// 		audio.play();
// 		renderFrame();
// 	};
// };







