import { BASE_URL, DEFAULT_TIMEOUT_MS } from '../test-config';
import puppeteer from 'puppeteer';

describe('renders without crashing with chrome', () => {
	const inputNameSelector = '#root input[placeholder="name"]';
	const saveButtonSelector = '#root > div > button';
	const headerSelector = '#root > div > h2';

	test('we view the what\'s your name h2 header', async () => {
		const browser = await puppeteer.launch({
			headless: true,
		});
		const page = await browser.newPage();

		await page.goto(BASE_URL);
		await page.waitForSelector('#root');

		const header = await page.$eval(headerSelector, e => e.innerHTML);
		expect(header.trim()).toEqual('What is your name ?');

		browser.close();
	}, DEFAULT_TIMEOUT_MS);

	test('Should change the title when typed a new name', async () => {
		const NEW_NAME = 'New Test Name';
		const browser = await puppeteer.launch({
			headless: true,
		});
		const page = await browser.newPage();

		await page.goto(BASE_URL);
		await page.waitForSelector('#root');

		await page.click(inputNameSelector);
		await page.focus(inputNameSelector);
		await page.type(inputNameSelector, NEW_NAME);
		await page.click(saveButtonSelector);
		const header = await page.$eval(headerSelector, e => e.innerHTML);
		expect(header.trim()).toEqual(`Hello ${NEW_NAME} !`);

		browser.close();
	}, DEFAULT_TIMEOUT_MS);


	test('add a name, sort names, take screenshots', async () => {
		const browser = await puppeteer.launch({
			headless: true,
		});
		const page = await browser.newPage();
		await page.goto(BASE_URL);

		await page.waitForSelector('#root');
		await page.click(inputNameSelector);
		await page.focus(inputNameSelector);
		await page.type(inputNameSelector, 'zoe');
		await page.click(saveButtonSelector);	

		//check if the new name at the first position
		const firstPosSelector = 'table > tbody > tr:nth-child(2) > td > a'
		const firstPosition = await page.$eval(firstPosSelector, e => {return e.innerHTML});
		expect('zoe').toEqual(firstPosition)

		//take the first screenshot
		await page.setViewport({width:1024, height:600})
		await page.screenshot({path: 'z-name-01.png'});

		//sort name ASC (click Name once, and go to the last page)
		await page.waitForSelector('div > table > tbody > tr > .sortable-column:nth-child(1)')
		await page.click('div > table > tbody > tr > .sortable-column:nth-child(1)')
		await page.waitForSelector('div > div > .page > li:nth-last-child(1) > a')
		await page.click('div > div > .page > li:nth-last-child(1) > a')

		//check if the new name at the last position
		const lastPosSelector = 'table > tbody > tr:nth-last-child(1) > td > a'
		const lastPosition = await page.$eval(lastPosSelector, e => {return e.innerHTML});
		expect('zoe').toEqual(lastPosition)

		//take the second screenshot
		await page.screenshot({path: 'z-name-02.png'});

		browser.close();
	}, DEFAULT_TIMEOUT_MS);

});


