
let new_item_name;
let new_item_des = 'description...';
let new_item_image = 'https://royalwise.com/rw/wp-content/uploads/2015/04/Apple_Photos.png';
let message = document.querySelector('.message');


function clearText(){
	document.querySelector('input').value = "";
	document.querySelector('textarea').value = "";
}


function previewName() {
	let new_item = document.querySelector('.item');
	let preview_name = document.querySelector('.preview_name');
	new_item_name = new_item.value.toLowerCase();
	preview_name.textContent = new_item_name;
}


function previewDes() {
	let new_des = document.querySelector('.description');
	let preview_des = document.querySelector('.preview_des');
	new_item_des = new_des.value.toLowerCase();
	preview_des.textContent = new_item_des;
}


function previewFile() {
	let preview_img = document.querySelector('.preview_img');
	let file    = document.querySelector('input[type=file]').files[0];
	let reader  = new FileReader();

	reader.addEventListener('load', function () {
		preview_img.src = reader.result; // string
		new_item_image = preview_img.src;
	}, false);

	if (file) {// name, size, type...
		reader.readAsDataURL(file);
	}
}


function add_new_item_to_server(){
	message.innerHTML = new_item_name + ' added to the list!';
	post_new_item(new_item_name, new_item_des, new_item_image);
	clearText();
	get_inventory();
}


function post_new_item(new_item_name, new_item_des, new_image) {
	fetch('/add', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			item_name: new_item_name,
			item_des: new_item_des,
			item_image: new_image
		})
	});
}


function display_list(items){
	let list = document.querySelector('.list');
	list.innerHTML = '';
	items.forEach(item =>{
		let showcase = document.createElement('div');
		showcase.className='showcase';
		list.appendChild(showcase);

		let new_img = document.createElement('img');
		new_img.className = 'new_img';
		new_img.src = item['image'];

		let text = document.createElement('div');
		text.className = 'text';
		let name = document.createElement('p');
		name.contentEditable = true;
		name.className = 'name';
		name.textContent = item['name'];

		let des = document.createElement('p');
		des.contentEditable = true;
		des.className ='des';
		des.textContent = item['description'];

		text.appendChild(name);
		text.appendChild(des);

		let control = document.createElement('div');
		control.className = 'control';
		let button_edit = document.createElement('button');
		let button_delete = document.createElement('button');

		button_edit.dataset.id = button_delete.dataset.id = item['id'];

		button_edit.className = 'edit';
		button_delete.className = 'delete';

		button_edit.textContent  = 'Edit';
		button_delete.textContent = 'Delete';

		button_edit.addEventListener('click', edit_from_server);
		button_delete.addEventListener('click', delete_from_server);

		control.appendChild(button_edit);	
		control.appendChild(button_delete);	

		showcase.appendChild(new_img);
		showcase.appendChild(text);
		text.appendChild(control);	
	})
}


function get_inventory() {
	fetch('/list_items', {method: 'get'})
	.then(response => response.json())
	.then(e => display_list(e)) // display items
	.catch(error => console.log('There was an error: ', error));
}


function delete_from_server() {
	let id = this.dataset.id;
	return fetch('/delete/' + id, {method: 'delete'})
	.then(response => response.json())
	.then(console.log('item with id',id, 'has been deleted from SERVER!'))
	.then(get_inventory)
	.catch(error => console.log('There was an error: ', error));
}


function edit_from_server() {
	let id = this.dataset.id;
	let edited_name = this.parentElement.parentElement.querySelector('.name').textContent;
	let edited_des = this.parentElement.parentElement.querySelector('.des').textContent;
	return fetch('/edit/' + id,
		{
			method: 'put',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				item_name: edited_name,
				item_des: edited_des,
			})
		})
	.then(response => response.json())
	.then(get_inventory)
	.catch(error => console.log('There was an error: ', error));
}

get_inventory();




