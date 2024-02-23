/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const puppeteer = require('puppeteer');

/**
 * CALCULATE MODULE
 */

/**
 * INFO
 */
async function pressCalculate(newPage) {
	await newPage.evaluate(() => {
		document.querySelector('input[type="submit"][value="Beräkna"]').click();
	});
	await newPage.waitForNavigation();
	console.log('Calculating...');
}

module.exports = {
	pressCalculate,
};
