/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const puppeteer = require('puppeteer');

/**
 * CALCULATE MODULE
 * 
 * * calculate
 * 
 * The function "calculate" triggers the calculate action on a web page by clicking a submit button with the value "Beräkna".
 * 
 * This function uses Puppeteer's `evaluate` method to execute JavaScript within the context of the
 * page represented by `newPage`. It specifically clicks an input element of type submit with the 
 * value "Beräkna". After triggering the click, it waits for the page navigation to complete, indicating
 * that the calculation and any subsequent page load have finished. It logs "Calculating..." to 
 * indicate the process is underway.
 *
 */

/**
 * @param {object} newPage
 * @returns {Promise<void>}
 * @async
 */
async function calculate(newPage) {
	await newPage.evaluate(() => {
		document.querySelector('input[type="submit"][value="Beräkna"]').click();
	});
	await newPage.waitForNavigation();
	console.log('Calculating...');
}

module.exports = {
	calculate,
};
