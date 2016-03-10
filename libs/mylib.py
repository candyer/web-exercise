users = {
    'candy': '123',
    'bonbon': 'abc'
}

def make_form(my_error=''):
    # Should use template instead !!!
    return """
<html>
 <p style="color:red">{}</p>
 <form method="post">
  name: <input type="text" name="login" />
  pass: <input type="password" name="pwd" />
  <input type="submit" value="send"/>
 </form>
</html>
""".format(my_error)

def check_login(login, password):
    # checking in the database (SQL)
    # create a sqlite3 / postgres
    return login in users and users[login] == password

def log_user(session, l):
    session['user'] = l

def is_logged(session):
    return 'user' in session

def log_out(session):
    session.pop('user')

# add user
