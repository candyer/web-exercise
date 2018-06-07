from flask import Flask, request, flash, render_template, url_for, redirect
from wtforms import Form, BooleanField, StringField, PasswordField, validators
import sqlite3
import os

app = Flask(__name__)
app.secret_key = os.urandom(24) # flash requires this



@app.route('/')
def home():
	return 'welcome'



class RegistrationForm(Form):
	username = StringField('', [validators.Length(min=4, max=25)], render_kw={"placeholder": "Username"})
	password = PasswordField('', [
		validators.DataRequired(),
		validators.EqualTo('confirm', message='Passwords must match')
		], 
		render_kw={"placeholder": "Password"})
	confirm = PasswordField('', render_kw={"placeholder": "Repeat Password"})



@app.route('/register',  methods=['GET', 'POST'])
def register():
	form= RegistrationForm(request.form)
	if request.method == 'POST' and form.validate():
		insert_user(form.username.data, form.password.data)
		flash('Thanks for registering')
		return redirect(url_for('login'))
	return render_template('register.html', form=form)



@app.route('/login', methods=['GET', 'POST'])
def login():
	error = None
	if request.method == 'POST':
		if check_username(request.form['username']) == None:
			error = 'Username does not exist, please try again'
		elif request.form['password'] != check_password(request.form['username']):
			error = 'Password does not match, pleae try again'
		else:
			return redirect(url_for('home'))
	return render_template('login.html', error=error)



def create_table():
	conn = sqlite3.connect('drive.db')
	c = conn.cursor()
	c.execute('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, password TEXT);')
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
	c.execute("SELECT name FROM users where name = ?", (username,))
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



if __name__ == '__main__':
	app.run(debug=True)