from flask import Flask, request, flash, render_template, url_for, redirect, session
from wtforms import Form, BooleanField, StringField, PasswordField, validators
from functools import wraps
import sqlite3
import os
from passlib.hash import sha256_crypt

app = Flask(__name__)
app.secret_key = '\xf6\xc8\xfaCw\xcf9O\xc2\xf8s\xeb\xed7J\xd2\x8b\xee\xe4\xc4\xa2$\xf8\x00' # flash requires this



# login required decorator
def login_required(f):
	@wraps(f)
	def wrap(*args, **kwargs):
		if 'logged_in' in session:
			return f(*args, **kwargs)
		else:
			flash('Please login')
			return redirect(url_for('login', next=request.url))
	return wrap
	


@app.route('/')
@login_required
def home():
	return render_template('home.html', user=session['username'] )



class RegistrationForm(Form):
	username = StringField('', [validators.Length(min=3, max=25)], render_kw={"placeholder": "Username"})
	password = PasswordField('', [
		validators.DataRequired(),
		validators.EqualTo('confirm', message='Passwords must match')
		], 
		render_kw={"placeholder": "Password"})
	confirm = PasswordField('', render_kw={"placeholder": "Repeat Password"})



@app.route('/register',  methods=['GET', 'POST'])
def register():
	form= RegistrationForm(request.form)
	username = form.username.data.lower()

	if check_username(username):
		flash('Username exists, please choose another one')
		return render_template('register.html', form=form)

	if request.method == 'POST' and form.validate():
		pwd = sha256_crypt.encrypt(form.password.data)
		insert_user(username, pwd)
		flash('Thanks for registering')
		return redirect(url_for('login'))

	return render_template('register.html', form=form)



@app.route('/login', methods=['GET', 'POST'])
def login():
	error = None
	if request.method == 'POST':
		username = request.form['username'].lower()
		password = request.form['password']

		if check_username(username) == None:
			error = 'Username does not exist, please try again'

		elif not sha256_crypt.verify(password, check_password(username)):
			error = 'Password does not match, pleae try again'
		else:
			session['logged_in'] = True
			session['username'] = username
			flash('You were just logged in!')
			return redirect(request.args.get('next', ''))
	return render_template('login.html', error=error)



@app.route('/logout')
@login_required
def logout():
	session.pop('logged_in', None)
	session.pop('username', None)
	flash('You were just logged out!')
	return redirect(url_for('login'))



def create_table():
	conn = sqlite3.connect('drive.db')
	c = conn.cursor()
	c.execute('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, password TEXT);')
	c.execute('CREATE TABLE IF NOT EXISTS files (userid INTEGER, fileid INTEGER PRIMARY KEY, filename TEXT);')
	conn.commit()
	c.close()
	conn.close()
# create_table()



def insert_user(username, password):
	conn = sqlite3.connect('drive.db')
	c = conn.cursor()
	c.execute('INSERT INTO users (name, password) VALUES (?, ?);', (username, password))
	conn.commit()
	c.close()
	conn.close()



def check_username(username):
	conn = sqlite3.connect('drive.db')
	c = conn.cursor()
	c.execute("SELECT id, name FROM users where name = ?", (username,))
	data = c.fetchone()	
	conn.commit()
	c.close()
	conn.close()
	return data



def check_password(username):
	conn = sqlite3.connect('drive.db')
	c = conn.cursor()
	c.execute("SELECT password FROM users where name = ?", (username,))
	data = c.fetchone()	
	conn.commit()
	c.close()
	conn.close()
	return data[0]



def upload_file(filename):
	conn = sqlite3.connect('drive.db')
	c = conn.cursor()
	userid = check_username(session['username'])[0]
	print '///////////////////////////////////'
	print filename
	print '///////////////////////////////////'
	c.execute('INSERT INTO files (userid, filename) VALUES (?, ?);', (userid, filename))
	conn.commit()
	c.close()
	conn.close()



if __name__ == '__main__':
	app.run(debug=True)




