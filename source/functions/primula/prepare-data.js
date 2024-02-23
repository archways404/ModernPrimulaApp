/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const puppeteer = require('puppeteer');

/**
 * PREPARE-DATA MODULE
 */

/**
 * INFO
 */
async function prepareInsertData(newPage, data) {
	for (row in data) {
		console.log('prepareInsertData (row): ', data[row]);
	}
	let counter = 1;
	while (counter != data.length) {
		const buttonSelector = 'input[type="submit"][value="Ny rad"]';
		await newPage.waitForSelector(buttonSelector);
		const button = await newPage.$(buttonSelector);
		await button.click();
		await newPage.waitForNavigation();
		console.log('button clicked: ', counter);
		counter++;
	}
}

module.exports = {
	prepareInsertData,
};
