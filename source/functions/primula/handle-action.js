/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const puppeteer = require('puppeteer');

/**
 * HANDLE-ACTION MODULE
 */

/**
 * INFO
 */
async function removeArende(newPage) {
	await newPage.on('dialog', async (dialog) => {
		console.log('Dialog message:', dialog.message());
		await dialog.accept();
	});
	const throwAway = await newPage.locator(
		'input[name="removeArende"][title="Kasta"]'
	);
	await throwAway.click();
	await newPage.waitForTimeout(500);
}

/**
 * INFO
 */
async function submitArende(newPage) {
	const submitA = await newPage.locator('input[type="submit"][value="Skicka"]');
	await submitA.click();
	await newPage.waitForTimeout(500);
}

/**
 * INFO
 */
async function closeBrowser(newPage) {
	await newPage.close();
	//await browser.close();
}

module.exports = {
	removeArende,
	submitArende,
	closeBrowser,
};
