

const num = 33; 
for (let i = 0; i < num; i++) {
	let boxes = document.createElement("div");
	boxes.className = "grids";
	for (let j = 0; j < 4; j++) {
		let box = document.createElement("div");
		box.className = "square";
		box.addEventListener('click', action);
		boxes.appendChild(box);	
	}
	document.getElementById("container").appendChild(boxes);				
}

function action() {
	console.log('action', this)
	if (this.className.includes('open')) {
		backToOrigin(this);
	} else {
		enlarge(this);
	}
}

function enlarge(e){
	console.log('enlarge', e)
	e.classList.add('open');
	parent = e.parentNode;
	children = parent.childNodes;
	for ( let k = 0; k < children.length; k++) {
		if (! children[k].className.includes('open')) {
			children[k].classList.add('close');
		}
	}
}

function backToOrigin(e) {
	console.log('back')
	parent = e.parentNode;
	children = parent.childNodes;
	for ( let k = 0; k < children.length; k++) {
		if (children[k].className.includes('open')) {
			children[k].classList.remove('open');
		} else {
			children[k].classList.remove('close');
		}
	}
}
