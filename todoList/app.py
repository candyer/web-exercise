from flask import Flask, render_template, request
import sqlite3

app = Flask(__name__)


@app.route('/',  methods=['GET', 'POST'])
def home():
	if request.method == 'POST':
		task = request.form['task'].strip()
		if task:
			insert_task(task)

	tasks = []
	for id, task in get_tasks():
		line = "<p><input type='checkbox' name= %d > %s </p>" % (id, escape_string(task))
		tasks.append(line)
	tasks = ''.join(tasks)		

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

	''' % (tasks)



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



def escape_string(s):
	'''
	escape dangerous characters(<, >, ', "), there are more but this is just an example
	'''
	return s.replace('<', '&lt;').replace('>', '&gt;').replace("'", '&apos;').replace('"', '&quot;')



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











