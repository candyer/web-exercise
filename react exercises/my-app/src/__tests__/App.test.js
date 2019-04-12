import { BASE_URL, DEFAULT_TIMEOUT_MS } from '../test-config';
import puppeteer from 'puppeteer';

describe('renders without crashing with chrome', () => {
	// const inputNameSelector = '#root div > input[placeholder="add a name"]';
	const inputNameSelector = '#root > div > input';
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


	// test 4:
	// add a new user to the table, check this user has been added at the first row
	// then edit this user name to another name and confirm
	// check this user name has been updated
	// then delete this user
	// check the user has been deleted
	test('add a new name, update ', async () => {
		const browser = await puppeteer.launch({
			headless: true,
		});
		const page = await browser.newPage();
		await page.goto(BASE_URL);

		let newly_added_name = 'Harry Potter'
		const nameOnFirstRow = await page.$eval('table > tbody > tr:nth-child(2) > td > a', e => {return e.innerHTML});

		await page.waitForSelector('#root');
		await page.click(inputNameSelector);
		await page.focus(inputNameSelector);
		await page.type(inputNameSelector, newly_added_name);
		await page.click(saveButtonSelector);	

		//check if the newly added name at the first row
		expect('Harry Potter').toEqual(await page.$eval('table > tbody > tr:nth-child(2) > td > a', e => {return e.innerHTML}))

		//edit the newly added name	and save
		await page.waitForSelector('table > tbody > tr:nth-child(2) > td:nth-child(3) > .hovershow')
		await page.click('table > tbody > tr:nth-child(2) > td:nth-child(3) > .hovershow') // click edit button
		await page.waitForSelector('table > tbody > tr > td > input')
		await page.click('table > tbody > tr > td > input') // click input field
		newly_added_name = 'Hermione'
		await page.type(inputNameSelector, newly_added_name); // type inside input field
		await page.click('table > tbody > tr:nth-child(2) > td:nth-child(4) > button') // click confirm button

		// check if the newly edited name at the first row
		expect(newly_added_name == await page.$eval('table > tbody > tr:nth-child(2) > td > a', e => {return e.innerHTML}))

		// delete newly added name
		await page.waitForSelector('table > tbody > tr:nth-child(2) > td:nth-child(4) > .hovershow')
		await page.click('table > tbody > tr:nth-child(2) > td:nth-child(4) > .hovershow')// click delete button

		// check if the name as been deleted
		expect(nameOnFirstRow).toEqual(await page.$eval('table > tbody > tr:nth-child(2) > td > a', e => {return e.innerHTML}))
		browser.close();
	}, DEFAULT_TIMEOUT_MS);




});








