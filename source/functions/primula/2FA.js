/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const puppeteer = require('puppeteer');

/**
 * 2FA MODULE
 * 
 * * promptMFA
 * The function "promptMFA" checks if the Multi-Factor Authentication (MFA) prompt is present on the page within a given timeout.
 * 
 * This function waits for a specific selector to appear on the page, indicating the presence of an MFA prompt. 
 * It returns true if the selector is found within the specified timeout, indicating that MFA is being requested. 
 * If the selector does not appear within the timeout, or if an error occurs during the wait, it returns false.
 *
 * * getMFA
 * The function "getMFA" the MFA code from the page.
 * 
 * This function evaluates the browser context to find and extract the text content of an element identified by a specific selector, 
 * presumed to hold the Multi-Factor Authentication (MFA) code. It logs the extracted MFA numbers to the console and returns them.
 * Note: This function assumes the MFA code is visible and available in the page's DOM at the time of invocation.
 * 
 */

/**
 * @param {Object} newPage 
 * @returns {Promise<boolean>}
 * @async
 */
async function promptMFA(newPage) {
	try {
		const valid = await newPage.waitForSelector('#validEntropyNumber', {
			timeout: 12000,
		});
		if (valid) {
			return true;
		} else {
			return false;
		}
	} catch (error) {
		return false;
	}
}

/**
 * @param {Object} newPage
 * @returns {Promise<string>}
 * @async
 */
async function getMFA(newPage) {
	const mfaNumbers = await newPage.evaluate(() => {
		const mfaElement = document.querySelector('#validEntropyNumber');
		return mfaElement.textContent.trim();
	});
	console.log('mfaNumbers: ', mfaNumbers);
	return mfaNumbers;
	// SEND MFA NUMBERS VIA IPC
}

module.exports = {
	promptMFA,
	getMFA,
};
