
let doc = document.querySelector('.doc');
let change = undefined;


setInterval(function(){
	if (change == undefined) {
		get_file();
	}
}, 1000);


function update_file() {
	clearTimeout(change);
	change = setTimeout(function(){
	 	console.log("saving");
		post_file(doc.value);
		change = undefined;
	}, 1000)
}


function post_file(file) {
	fetch('/add_file', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			doc_value: file
		})
	});
}


function display(file) {
	doc.value = file['doc_value'];
}



function get_file() {
	fetch('/file_json', {method: 'get'})
	.then(response => response.json())
	.then(e => display(e))
	.catch(error => console.log('There was an error: ', error));
}


get_file();



