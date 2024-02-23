/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const puppeteer = require('puppeteer');

/**
 * NAVIGATION MODULE
 */

/**
 * INFO
 */
async function primulaNavigate(newPage) {
	const [response_language_swe] = await Promise.all([
		(SweBTN = newPage.locator(
			'xpath=//html/body/div/div[2]/div[2]/table[1]/tbody/tr/td[1]/form/input'
		)),
		SweBTN.click(),
	]);
	const [responseForm] = await Promise.all([
		(formLocation = newPage.waitForSelector(
			'xpath=//html/body/div/div[2]/div[2]/ul/li[1]/ul/li[3]/a'
		)),
		(form = newPage.locator(
			'xpath=//html/body/div/div[2]/div[2]/ul/li[1]/ul/li[3]/a'
		)),
		form.click(),
		newPage.waitForNavigation(),
	]);
	await newPage.waitForNetworkIdle();
	const [response_emp_id] = await Promise.all([
		newPage.waitForNavigation(),
		newPage.select(
			'xpath=//html/body/div/div[2]/div[5]/div/div[2]/form/table/tbody/tr/td/table/tbody/tr[2]/td[1]/select',
			'Timersättning (dagrapport)'
		),
	]);
	await newPage.waitForNetworkIdle();
}

module.exports = {
	primulaNavigate,
};
