from flask import Flask, render_template, request
from PIL import Image 
import StringIO


app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
def home():
	pictures = request.files.getlist('photos')
	feature = request.form.get('feature')
	contents = []
	if feature == 'filter':
		for picture in pictures:
			filter(picture)
			contents.append(filter(picture))
	return render_template('pic.html', srcs=contents)


def filter(picture):
	'''convert colored picture into a pure black and white image'''
	image_file = Image.open(picture)
	image_file = image_file.convert('1')
	output = StringIO.StringIO()
	image_file.save(output, format='PNG')
	contents = output.getvalue().encode("base64")
	output.close()
	return contents



if __name__ == '__main__':
	app.run(debug=True, host='0.0.0.0')



