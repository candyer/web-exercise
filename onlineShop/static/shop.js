
function display_inventory(items) {
	let inventory = document.querySelector('.inventory');
	items.forEach(item => {
		let box = document.createElement('p');
		box.className = 'item';
		inventory.appendChild(box);
		box.textContent = item;
	})		
}

//get inventory from server
function get_inventory() {
	fetch('http://127.0.0.1:5000/list_items', {method: 'get'})
	.then(response => response.json())
	.then(e => display_inventory(e)) // display items
	.catch(e => console.log("error", e));
}

get_inventory();
// setInterval(get_inventory, 1000);
