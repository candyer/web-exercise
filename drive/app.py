from flask import Flask, request, flash, render_template, url_for 

from wtforms import Form, BooleanField, StringField, PasswordField, validators

import sqlite3
import os

app = Flask(__name__)
app.secret_key = os.urandom(24) # flash requires this


@app.route('/')
def home():
	return 'welcome'


class RegistrationForm(Form):
	username = StringField('Username', [validators.Length(min=4, max=25)])
	password = PasswordField('New Password', [
		validators.DataRequired(),
		validators.EqualTo('confirm', message='Passwords must match')
	])
	confirm = PasswordField('Repeat Password')
	accept_tos = BooleanField('I accept the TOS', [validators.DataRequired()])



@app.route('/register',  methods=['GET', 'POST'])
def register():
	form= RegistrationForm(request.form)
	if request.method == 'POST' and form.validate():
		insert_user(form.username.data, form.password.data)
		flash('Thanks for registering')
	return render_template('register.html', form=form)



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

if __name__ == '__main__':
	app.run(debug=True)