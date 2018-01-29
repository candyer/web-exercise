from flask import Flask, request, render_template, jsonify
import sqlite3

app = Flask(__name__)


@app.route('/')
def hello():
	return 'welcome'


@app.route('/user')
def user():
	return render_template('user.html')


@app.route("/list_items", methods=['GET'])
def list_items():
	return jsonify(query_entry())


@app.route("/add", methods=['POST'])
def add_item():
	data = request.get_json() #new item
	if data:
		insert_entry(data['item_name'], data['item_des'], data['item_image'])
		return jsonify({"status": "ok"})
	return jsonify({"status": "fail"})


@app.route("/edit/<id>", methods=['PUT'])
def edit_item(id):
	data = request.get_json()
	edit_entry(data['item_name'], data['item_des'], id)
	return jsonify({"status": "ok"})
	return jsonify({"status": "fail"})


@app.route("/delete/<id>", methods=['DELETE'])
def delete_item(id):
	delete_entry(id)
	return jsonify({"status": "ok"})


def create_table():
	conn = sqlite3.connect('shopping.db')
	c = conn.cursor()
	c.execute('CREATE TABLE IF NOT EXISTS list (id INTEGER PRIMARY KEY, name TEXT, des TEXT, image TEXT);')

# create_table()


def insert_entry(item_name, item_des, item_image):
	conn = sqlite3.connect('shopping.db')
	c = conn.cursor()
	c.execute('INSERT INTO list (name, des, image) VALUES (?, ?, ?);',(item_name, item_des, item_image))
	conn.commit()
	c.close()
	conn.close()


def query_entry():
	conn = sqlite3.connect('shopping.db')
	c = conn.cursor()
	c.execute('SELECT id, name, des, image FROM list order by id')
	data = []
	for id, name, des, image in c.fetchall():
		data.append({
			'id': id,
			'name': name,
			'description': des,
			'image': image}
		)
	conn.commit()
	c.close()
	conn.close()
	return data


def edit_entry(new_name, new_des, id):
	conn = sqlite3.connect('shopping.db')
	c = conn.cursor()
	c.execute('UPDATE list SET name = ?, des = ? WHERE id = ?', (new_name, new_des, id))
	conn.commit()
	c.close()
	conn.close()


def delete_entry(id):
	conn = sqlite3.connect('shopping.db')
	c = conn.cursor()
	c.execute('DELETE from list WHERE id = {}'.format(id))
	conn.commit()
	c.close()
	conn.close()


if __name__ == '__main__':
	app.run(debug=True)



