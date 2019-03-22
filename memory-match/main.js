
let board = document.querySelector('.board');
let nums = shuffle([0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7]);
let clicked = [];

// random shuffle array
function shuffle(nums) {
	let len = nums.length, random_index, tmp;
	while (len > 0) {
		random_index = Math.floor(Math.random() * len);
		len--;
		tmp = nums[len];
		nums[len] = nums[random_index];
		nums[random_index] = tmp;
	}
	return nums;
}


// create cards 4 * 4
for (let i = 0; i < 16; i++) {
	let card = document.createElement('div');
	card.dataset.isclicked = false;
	card.dataset.ispared = false;
	card.value = nums[i];
	card.className = 'card';
	card.innerHTML = '?';
	board.appendChild(card);		
};


// 
function handleChange() {
	if (clicked.length < 2 && this.dataset.isclicked == 'false') {
		this.dataset.isclicked = true;
		this.style.color = 'salmon';
		this.innerHTML = this.value;
		clicked.push(this);
	}

	if (clicked.length == 2) {
		setTimeout(function() {
			let first = clicked[0];
			let second = clicked[1];
			if (first.value == second.value) {
				first.dataset.ispared = second.dataset.ispared = true;
				first.innerHTML = second.innerHTML = '😉';

			} else {
				first.dataset.isclicked = second.dataset.isclicked = false;
				first.innerHTML = second.innerHTML = '?';
				first.style.color = second.style.color = 'black';
			}
			clicked = [];	
			}, 800);
	} 
}

document.querySelectorAll('.card').forEach(card => card.addEventListener('click', handleChange));









