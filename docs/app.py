from flask import Flask, render_template
import sqlite3

app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
def doc():
	return render_template('doc.html')



if __name__ == '__main__':
	app.run(debug=True)