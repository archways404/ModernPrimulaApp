/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const puppeteer = require('puppeteer');

/**
 * PUPPETEER INIT MODULE
 */

// headless: true or false
const headless = true;

// Declare variables
let launchOptions;

/**
 * INFO
 */
async function loginToMain(username, password) {
	try {
		if (headless === true) {
			launchOptions = {
				headless: 'new',
				args: ['--no-sandbox'],
			};
		} else if (headless === false) {
			launchOptions = {
				headless: false,
			};
		}
		const browser = await puppeteer.launch(launchOptions);
		console.log('Browser is up and running: ', launchOptions);
		const page = await browser.newPage();
		await page.goto('https://primula.mau.se:10443/remote/login?lang=en');
		await page.type('#username', username);
		await page.type('#credential', password);
		const [response] = await Promise.all([
			page.waitForNavigation(),
			page.click('button[id=login_button]'),
		]);
		const globe = page.locator(
			'xpath=//html/body/section/div/div/div[2]/div[2]/div/button[1]'
		);
		await globe.click();
		const getNewPageWhenLoaded = async () => {
			return new Promise((x) =>
				browser.on('targetcreated', async (target) => {
					if (target.type() === 'page') {
						const newPage = await target.page();
						const newPagePromise = new Promise((y) =>
							newPage.once('domcontentloaded', () => y(newPage))
						);
						const isPageLoaded = await newPage.evaluate(
							() => document.readyState
						);
						return isPageLoaded.match('complete|interactive')
							? x(newPage)
							: x(newPagePromise);
					}
				})
			);
		};
		const newPagePromise = getNewPageWhenLoaded();
		const newPage = await newPagePromise;
		await newPage.waitForNetworkIdle();
		return newPage;
	} catch (error) {
		console.log(error);
	}
}

/**
 * INFO
 */
async function loginToPrimula(newPage, username, password) {
	const [response_login] = await Promise.all([
		newPage.waitForNavigation(),
		// Wait for the element to be loaded on the page
		await newPage.waitForSelector('div[aria-label="Malmö universitet"]'),

		// Click on the element
		await newPage.click('div[aria-label="Malmö universitet"]'),

		//newPage.click('xpath=//html/body/div[2]/div[2]/div/main/div/div/form/div[1]/div[61]')
	]);
	let fix_username = `${username}@mau.se`;
	await newPage.type('#userNameInput', fix_username);
	await newPage.type('#passwordInput', password);
	const [response_post_login] = await Promise.all([
		newPage.waitForNavigation(),
		newPage.click('#submitButton'),
	]);
}

module.exports = {
	loginToMain,
	loginToPrimula,
};
