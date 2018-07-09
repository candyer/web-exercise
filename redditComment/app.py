from flask import Flask, render_template, request
import sqlite3


app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def home():
	parent_id = None
	already_open = request.args.get('already_open', 'False') == 'True'

	if request.method == 'POST':
		content = request.form['comment'].strip()
		if content:
			insert_entry(0, content)
	else:
		action = request.args.get('action', '')
		parent_id = request.args.get('id', '0')
		value = request.args.get('message', '')
		if action == 'upvote':
			update_score(1, parent_id)
		elif action == 'downvote':
			update_score(-1, parent_id)
		elif action == 'submit' and value.strip():
			insert_entry(parent_id, value)

	tree = make_tree(query_entry())

	return render_template('home.html', tree=tree, selected_id=int(parent_id), already_open=already_open)



class Node():
	def __init__(self, node_id):
		self.id = node_id
		self.score = None
		self.content = None
		self.children = []
		self.parent = None

	def __str__(self):
		return 'id {} children {} {} {} {}'.format(self.id, self.score, self.children, self.parent, self.content)



def make_tree(raw_nodes):
	'''receive data from database and form a tree'''
	nodes = {0: Node(0)}
	for raw_node in raw_nodes:
		id_ = raw_node['id']
		node = Node(id_)
		node.score = raw_node['score']
		node.content = raw_node['content']
		node.parent = raw_node['parent']
		nodes[id_] = node

	for node in nodes.values():
		if node.parent != None:
			nodes[node.parent].children.append(node)

	for node in nodes.values():
		node.children.sort(key=lambda x: -x.score)

	return nodes[0]



def create_table():
	conn = sqlite3.connect('reddit.db')
	c = conn.cursor()
	c.execute('CREATE TABLE IF NOT EXISTS comments (id INTEGER PRIMARY KEY, parent INTEGER, score INTEGER, content BLOB);')
# create_table()



def insert_entry(parent, content):
	conn = sqlite3.connect('reddit.db')
	c = conn.cursor()
	c.execute('INSERT INTO comments (parent, score, content) VALUES (?, ?, ?);', (parent, 0, content))
	conn.commit()
	c.close()
	conn.close()



def update_score(n, id):
	''' n = 1 / -1'''
	conn = sqlite3.connect('reddit.db')
	c = conn.cursor()
	c.execute('UPDATE comments SET score = score + ? where id = ? ', (n, id,))
	conn.commit()
	c.close()
	conn.close()



def query_entry():
	conn = sqlite3.connect('reddit.db')
	c = conn.cursor()
	c.execute('SELECT id, parent, score, content from comments order by id')
	data = []
	for id, parent, score, content in c.fetchall():
		data.append({
			'id': id,
			'parent': parent,
			'score': score,
			'content': content}
		)	
	conn.commit()
	c.close()
	conn.close()	
	return data



if __name__ == '__main__':
	app.run(debug=True)





