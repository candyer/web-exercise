
import requests
import sqlite3

def create_table():
	conn = sqlite3.connect('data.db')
	c = conn.cursor()
	c.execute('CREATE TABLE IF NOT EXISTS items (id INTEGER, name TEXT, price INTEGER, image BLOB);')
create_table()


def insert_entry(id, name, price, image):
	conn = sqlite3.connect('data.db')
	c = conn.cursor()
	c.execute('INSERT INTO items (id, name, price, image) VALUES (?, ?, ?, ?);', (id, name, price, image))
	conn.commit()
	c.close()
	conn.close()


def get_val(item, res, keyword, end_condition):
	pos = item.find(keyword)
	if pos == -1:
		return None
	else:
		pos = item.find(keyword) + len(keyword)
		while True:
			if item[pos] != end_condition:
				res.append(item[pos])
				pos += 1
			else:
				break
		return ''.join(res)	


def get_item(json):
	'''
	price's unit is cent, so i can save it to database as integer. 
	integer is more accurate than float
	'''
	ids, names, prices, imgs = [], [], [], []
	items = json.split('data-productid=')
	for item in items[1:]:
		ids.append(item[1:8]) #id
		imgs.append(get_val(item, ['https:'], 'data-src=\"', '"'))
		names.append(get_val(item, [], ' alt=\"', '"'))
		price = get_val(item, [], "data-product-price>", "<")
		if price: # if item is not available, there is no price to be found
			price = price.replace('.', '')
		prices.append(price) 
	return ids, names, prices, imgs


def get_page(url):
	r = requests.get(url)
	print r
	js = r.json()['productListerHTML']
	ids, names, imgs, prices = get_item(js)
	for unique_id, name, price, img in zip(ids, names, imgs, prices):
		insert_entry(unique_id, name, price, img)


def crawl_datas():
	r = requests.get('https://www.coopathome.ch/supermarket/c/supermarket/results?page=1')
	pages = r.json()['pagination']['numberOfPages'] #this tells how many pages in total
	for i in range(pages):
		print 'page: {}'.format(i)
		url = 'https://www.coopathome.ch/supermarket/c/supermarket/results?page=' + str(i)
		get_page(url)

crawl_datas()



