from flask import Flask
from flask import request
from flask import redirect
from flask import url_for
from flask import session
from libs.mylib import *

app = Flask(__name__)
app.secret_key = 'vhbjnkl;lgjfgjhkl;lkjghchjk'

@app.route("/loggout", methods=['POST', 'GET'])
def logout():
    log_out(session)
    return redirect(url_for('home'))

@app.route("/logged", methods=['POST', 'GET'])
def welcome():
    if not is_logged(session):
        return redirect(url_for('home'))
    return "you are logged in {} yeaaah".format(session['user'])

@app.route("/", methods=['POST', 'GET'])
def home():
    if request.method == 'GET':
        return make_form(request.args.get('x'))

    l = request.form['login']
    p = request.form['pwd']
    if check_login(l, p):
        log_user(session, l)
        return redirect(url_for('welcome'))
    return make_form('bad account')
        

# create another page to register
# that save the user / pass to the database
# it's own template


# serve some static files
# and include local css from here
# and at least one image, a logo for your site !!


# add a favicon

if __name__ == "__main__":
    app.run(debug=True)
