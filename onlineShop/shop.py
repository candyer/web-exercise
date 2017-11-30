from flask import Flask, jsonify, request
import sqlite3

app = Flask(__name__, static_url_path='')

def push_item_to_inventory(new_item):
	insert_entry(new_item)

@app.route("/")
def hello():
	return "This is HOME page!"

@app.route("/shop")
def shop():
	return app.send_static_file('shop.html')

@app.route("/add_item", methods=['POST'])
def add_item():
	data = request.get_json()
	if data:
		push_item_to_inventory(data['new_item_key'])
		return '{status: "ok"}'
	return '{status: "fail"}'

@app.route("/admin", methods=['GET'])
def admin():
	return app.send_static_file('index.html')

@app.route("/list_items", methods=['GET'])
def list_items():
	return jsonify(query_entry())

#create database called 'shop', and table called 'inventory'
def create_table():
	conn = sqlite3.connect('shop.db')
	c = conn.cursor()
	c.execute('CREATE TABLE IF NOT EXISTS inventory(id INTEGER PRIMARY KEY, item TEXT)')

#insert data inside table 'inventory'
def insert_entry(new_item):
	conn = sqlite3.connect('shop.db')
	c = conn.cursor()
	c.execute('INSERT INTO inventory (item) VALUES (?)', (new_item,))
	conn.commit()
	c.close()
	conn.close()

#get data from database
def query_entry():
	conn = sqlite3.connect('shop.db')
	c = conn.cursor()
	c.execute('SELECT item FROM inventory order by id')
	x = c.fetchall()
	# conn.commit()
	c.close()
	conn.close()
	return x	

# create_table() #only need to run this function once

if __name__ == '__main__':
	app.run(debug=True)
