from flask import Flask, render_template, request
import sqlite3

app = Flask(__name__)


@app.route('/',  methods=['GET', 'POST'])
def home():
	if request.method == 'POST':
		task = request.form['task'].strip()
		if task:
			insert_task(task)
	tasks = get_tasks()

	return ''' 

		<!DOCTYPE html>
		<html>
			<body>
				<h1>To do List</h1>
				<form action="" method="POST" >
					<input type='text' name='task' placeholder="add a task">
					<button>Add</button>
				</form>

				<form>
					%s
				</form>
				<button>Finish</button>
			</body>
		</html>

	''' % (f(tasks))



def f(tasks):
	res = []
	for id, task in tasks:
		line = "<p><input type='checkbox' name= %d > %s </p>" % (id, task)
		res.append(line)
	return ''.join(res)



def create_table():
	conn = sqlite3.connect('todolist.db')
	c = conn.cursor()
	c.execute('CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY, task TEXT);')
	conn.commit()
	c.close()
	conn.close()
# create_table()



def insert_task(task):
	conn = sqlite3.connect('todolist.db')
	c = conn.cursor()
	c.execute('INSERT INTO tasks (task) VALUES (?);', (task,))
	conn.commit()
	c.close()
	conn.close()



def get_tasks():
	conn = sqlite3.connect('todolist.db')
	c = conn.cursor()	
	c.execute("SELECT id, task FROM tasks ")
	tasks = c.fetchall()
	conn.commit()
	c.close()
	conn.close()
	return [[id, task] for id, task in tasks]



if __name__ == '__main__':
	app.run(debug=True)











