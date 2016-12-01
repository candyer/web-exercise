# import sqlite3

# conn = sqlite3.connect('test.db')
# c = conn.cursor()

# def create_table():
# 	c.execute('CREATE TABLE IF NOT EXISTS sample(unix REAL, datestamp TEXT, keyword TEXT, value REAL)')

# def date_entry():
# 	# c.execute("INSERT INTO sample VALUES(14512342, '2016-01-01', 'PYTHON', 5)")
# 	c.execute("INSERT INTO sample VALUES(14512342, '2016-01-02', 'PYTHON', 8)")
# 	conn.commit()
# 	c.close()
# 	conn.close()

# def dynamic_data_entry():
# 	unix = time.time()
# 	date = str(datetime.datetime.fromtimestamp(unix).strftime('%Y-%m-%d %H:%M:%S'))
# 	keyword = 'PYTHON'
# 	value = random.randrange(0,10)
# 	c.execute("INSERT INTO sample (unix, datestamp, keyword, value) VALUES (?, ?, ?, ?)", (unix, date, keyword, value))
# 	conn.commit()

# def read_from_db():
# 	c.execute('SELECT * FROM sample')
# 	data = c.fetchall()
# 	for row in c.fetchall():
# 		print row



import sqlite3

conn = sqlite3.connect('test.db')
c = conn.cursor()

def create_table():
	c.execute('CREATE TABLE IF NOT EXISTS books(id INTEGER PRIMARY KEY, name TEXT, price REAL)')

def data_entry(names, prices):
	for i in range(len(names)):
		c.execute("INSERT INTO books (name, price) VALUES (?, ?)", (names[i], prices[i]))
	conn.commit()
	c.close()

def read_from_db():
	c.execute('SELECT * FROM books')
	data = c.fetchall()
	for row in c.fetchall():
		print row

names = ['1984', 'The Three-Body Problem', 'A Christmas Carol', 'Pride And Prejudice', 'The Great Gatsby', 'Hamlet']
prices = [10, 15.5, 12.0, 9.5, 8.0, 11.0]
create_table()
# data_entry(names, prices)
read_from_db()
