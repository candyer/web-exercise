from flask import Flask, request, render_template, jsonify
import sqlite3

app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
def doc():
	if request.method == 'POST':
		file = request.form['text']
		if file:
			edit_file(file)
	return render_template('doc.html')



@app.route("/file_json", methods=['GET'])
def file_json():
	return jsonify(get_file())



@app.route("/add_file", methods=['POST'])
def add_file():
	data = request.get_json()
	if data:
		edit_file(data['doc_value'])
		return jsonify({"status": "ok"})
	return jsonify({"status": "fail"})



def create_table():
	conn = sqlite3.connect('docs.db')
	c = conn.cursor()
	c.execute('CREATE TABLE IF NOT EXISTS doc (id INTEGER PRIMARY KEY, file BLOB);')
	conn.commit()
	c.close()
	conn.close()
# create_table()



def get_file():
	conn = sqlite3.connect('docs.db')
	c = conn.cursor()	
	c.execute("SELECT file FROM doc where id = 1")
	data = {'doc_value': c.fetchone()[0]}
	conn.commit()
	c.close()
	conn.close()
	return data



def edit_file(file):
	conn = sqlite3.connect('docs.db')
	c = conn.cursor()
	c.execute('UPDATE doc SET file = ? where id = 1;', (file,))
	conn.commit()
	c.close()
	conn.close()



if __name__ == '__main__':
	app.run(debug=True)





