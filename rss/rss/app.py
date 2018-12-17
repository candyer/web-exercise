
from os import environ
from flask import Flask, Response
import requests
import json
from podgen import Podcast, Episode, Media


app = Flask(__name__)


def list_folder():
	'''https://dropbox.github.io/dropbox-api-v2-explorer/#files_list_folder'''
	url = "https://api.dropboxapi.com/2/files/list_folder"
	headers = {
		"Authorization": "Bearer YOUR ACCESS TOKEN",
		"Content-Type": "application/json"
	}
	data = {
		"path": ""
	}

	r = requests.post(url, headers=headers, data=json.dumps(data))
	paths = []
	for path in r.json()['entries']:
		paths.append(path['path_lower'])
	return paths


def get_temporary_link():
	'''https://dropbox.github.io/dropbox-api-v2-explorer/#files_get_temporary_link'''
	paths = list_folder()
	url = "https://api.dropboxapi.com/2/files/get_temporary_link"

	headers = {
		"Authorization": "Bearer YOUR ACCESS TOKEN",
		"Content-Type": "application/json",
	}

	urls = []
	for path in paths:
		data = {
			"path": path
		}
		r = requests.post(url, headers=headers, data=json.dumps(data))		
		urls.append((r.json()['metadata']['size'], r.json()['link']))
	return urls


@app.route('/')
def index():
	'''https://podgen.readthedocs.io/en/latest/'''
	urls = get_temporary_link()
	p = Podcast()
	p.name = "ambience"
	p.description = "ambience"
	p.website = "LINK HERE"
	p.explicit = True	

	for i, (size, url) in enumerate(urls):
		my_episode = Episode()
		my_episode.title = "ambience music {}".format(i + 1)
		my_episode.media = Media(url,
								 size=size,
								 type="audio/mpeg")
		p.episodes.append(my_episode)

	rss = str(p)
	return Response(rss, mimetype='text/xml')


app.run(host='0.0.0.0', port=environ.get('PORT'))




























