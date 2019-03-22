from flask import Flask, render_template, request, send_file, Response
from PIL import Image 
import StringIO
import imageio

app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
def home():
	pictures = request.files.getlist('photos')
	feature = request.form.get('feature')
	contents = []
	if feature == 'filter':
		for picture in pictures:
			contents.append(filter(picture))

	elif feature == 'collage':
		contents.append(collage(pictures))

	# else:
	# 	return movie(pictures)

	return render_template('pic.html', srcs=contents)


@app.route('/a.gif')
def f():
	gif = open('movie.gif','r')
	return Response(gif.read(), mimetype='image/gif')


def filter(picture):
	'''
	convert colored picture into a pure black and white image
	mode='1': Black and white (monochrome), one bit per pixel.
	mode='L': Gray scale, one 8-bit byte per pixel.
	'''
	image_file = Image.open(picture)
	image_file = image_file.convert(mode='1')
	output = StringIO.StringIO()
	image_file.save(output, format='PNG')
	contents = output.getvalue().encode("base64")
	output.close()
	return contents



def collage(pictures):
	'''
	Given several images, return one collage 
	'''	
	ims = []
	width = height = 0
	thumbnail_heights = []
	for picture in pictures:
		im = Image.open(picture)
		w, h = im.size
		thumbnail_heights.append(h)
		width = max(width, w)
		height += h
		ims.append(im)

	new_im = Image.new('RGB', (width, height))

	y = 0
	for i, height in enumerate(thumbnail_heights):
		new_im.paste(ims[i], (0, y)) # (0, y) is the top left coordinate of each image
		y += height

	output = StringIO.StringIO()
	new_im.save(output, format='PNG')
	contents = output.getvalue().encode("base64")
	output.close()
	return contents


def movie(pictures):
	'''
	Given several images, possibly different sizes, return one gif 
	'''
	with imageio.get_writer('movie.gif', mode='I', duration=0.3, loop=2) as writer:
		for picture in pictures:
			image = imageio.imread(picture)
			writer.append_data(image)

	gif = open('movie.gif','r')
	return gif.read()


if __name__ == '__main__':
	app.run(debug=True)



