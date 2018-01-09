from flask import Flask, request, render_template, jsonify
import sqlite3

app = Flask(__name__)

@app.route('/')
def hello():
	return 'welcome'

@app.route('/user')
def user():
	return render_template('user.html')

@app.route('/list_food', methods=['GET'])
def list_food():
	return jsonify(query_entry('food'))

@app.route('/add', methods=['POST'])
def add():
	data = request.get_json()
	image = request.files['inputImage']
	return file.read()
	if data:
		push_item_to_inventory(data['item_name'], data['item_image'])
		return '{status: "ok"}'
	return '{status: "fail"}'

def create_table(category):
	conn = sqlite3.connect('shopping.db')
	c = conn.cursor()
	c.execute('CREATE TABLE IF NOT EXISTS {tb_name} (id INTEGER PRIMARY KEY, name TEXT, image BLOB)' .format(tb_name=category))

def insert_entry(category, item_name, item_image):
	conn = sqlite3.connect('shopping.db')
	c = conn.cursor()
	c.execute('INSERT INTO {tb_name} (name, image) VALUES ({n}, {i})'.\
		format(tb_name=category, n=item_name, i=item_image))
	conn.commit()
	c.close()
	conn.close()

def query_entry(category):
	conn = sqlite3.connect('shopping.db')
	c = conn.cursor()
	c.execute('SELECT name, image FROM {tb_name} order by id'.format(tb_name=category))
	x = c.fetchall()
	conn.commit()
	c.close()
	conn.close()
	return x

if __name__ == '__main__':
	app.run(debug=True)
