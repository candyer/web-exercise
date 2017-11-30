

// keep placeholder after submitting input.
function clearText(){
	document.querySelector('input').value = "";
}

// add new item to inventory, prevent any item_name with only spaces.
function push_new_item_to_server(){
	let new_item = document.querySelector('.new_item').value.trim();
	let message = document.querySelector('.message');
	if (new_item != ''){
		post_new_item(new_item);
		message.innerHTML = new_item + ' added to inventory!';
		clearText()
	}
}

// press enter key trigger 'add' function.
function enterControl(e) {
	if (e.keyCode == 13) {
		push_new_item_to_server();
		e.preventDefault();
	}
}

//post new_item to server
function post_new_item(new_item) {
	fetch('http://127.0.0.1:5000/add_item', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			new_item_key: new_item
		})});
}

document.onkeydown = enterControl;

