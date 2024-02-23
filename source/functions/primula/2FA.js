/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const puppeteer = require('puppeteer');

/**
 * MFA MODULE
 */

/**
 * INFO
 */
async function checkMFA(newPage) {
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
 * INFO
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
	checkMFA,
	getMFA,
};
