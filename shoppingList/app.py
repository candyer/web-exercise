from flask import Flask, request, render_template, jsonify
import sqlite3

app = Flask(__name__)


@app.route('/')
def hello():
	return 'welcome'

@app.route('/user')
def user():
	return render_template('user.html')

@app.route('/list_items', methods=['GET'])
def list_food():
	return jsonify(query_entry())

@app.route("/add", methods=['POST'])
def add_item():
	data = request.get_json()
	if data:
		insert_entry(data['item_name'], data['item_image'])
		return '{status: "ok"}'
	return '{status: "fail"}'

@app.route("/list_items", methods=['GET'])
def list_items():
	return jsonify(query_entry())


def create_table():
	conn = sqlite3.connect('shopping.db')
	c = conn.cursor()
	c.execute('CREATE TABLE IF NOT EXISTS list (id INTEGER PRIMARY KEY, name TEXT, image TEXT);')

# create_table()

def insert_entry(item_name, item_image):
	conn = sqlite3.connect('shopping.db')
	c = conn.cursor()
	c.execute('INSERT INTO list (name, image) VALUES (?, ?);',(item_name, item_image))
	conn.commit()
	c.close()
	conn.close()

def query_entry():
	conn = sqlite3.connect('shopping.db')
	c = conn.cursor()
	c.execute('SELECT name, image FROM list order by id')
	x = c.fetchall()
	conn.commit()
	c.close()
	conn.close()
	return x

if __name__ == '__main__':
	app.run(debug=True)



