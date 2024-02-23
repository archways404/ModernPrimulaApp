/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const puppeteer = require('puppeteer');

/**
 * PREPARE-DATA MODULE
 * 
 * * prepareInsertData
 * 
 * The function "prepareInsertData" prepares a web page for data insertion by dynamically adding the necessary number of input rows based on the provided data array.
 * 
 * It iterates through the data, logging each row for verification, and then repeatedly clicks a button to add new input rows until
 * the number of rows matches the length of the data array. This function is particularly useful in scenarios where a form on a web page
 * requires the addition of multiple entries, and the number of required entries varies dynamically.
 * 
 */

/**
 * @param {object} newPage 
 * @param {Array} data 
 * @returns {Promise<void>}
 * @async
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
