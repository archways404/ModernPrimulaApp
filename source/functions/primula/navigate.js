/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const puppeteer = require('puppeteer');

/**
 * NAVIGATION MODULE
 * 
 * * primulaNavigate
 * 
 * The function "primulaNavigate" navigates through a web page in a specified sequence using Puppeteer. 
 * 
 * The function performs a series of clicks to navigate from the language selection to a specific form, and then selects an option from a dropdown.
 * Each step involves waiting for elements to be available and navigations to complete, ensuring that the sequence
 * is followed accurately. 
 * 
 * This could be particularly useful for automated interactions with web applications that
 * require a series of navigational steps to reach a specific page or form, such as an internal payroll or HR system.
 * 
 */

/**
 * @param {object} newPage
 * @returns {Promise<void>}
 * @async
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
		await newPage.waitForSelector(
			'xpath=//html/body/div/div[2]/div[5]/div/div[2]/form/table/tbody/tr/td/table/tbody/tr[2]/td[1]/select'
		),
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
