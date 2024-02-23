/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const puppeteer = require('puppeteer');

/**
 * HANDLE-ACTION MODULE
 *
 * * removeTicket
 *
 * The function "removeTicket" handles the removal of an item (ärende) on a webpage by accepting a confirmation dialog
 * and clicking the removal button.
 *
 * It waits for a dialog to appear upon the removal action,
 * logs the dialog message, accepts the dialog, and then performs the click action on the
 * specified removal button. A brief timeout is observed to ensure the action's effect.
 *
 * * submitTicket
 *
 * The function "submitTicket" submits an ärende (case or application) by finding and clicking a submit button on the page.
 *
 * After clicking the submit button, the function waits for a short timeout to ensure
 * that any subsequent actions dependent on the submission can be initialized properly.
 *
 * * closeBrowser
 *
 * The function "closeBrowser" closes the current page (tab) within the browser.
 *
 * This function is typically used to clean up after certain actions have been completed on a page, or when the page is no longer needed.
 * Note: The commented out browser closing line suggests an option to close the entire browser instead of just a page.
 *
 */

/**
 * @param {object} newPage
 * @async
 */
async function removeTicket(newPage) {
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
 * @param {object} newPage
 * @async
 */
async function submitTicket(newPage) {
	const submitA = await newPage.locator('input[type="submit"][value="Skicka"]');
	await submitA.click();
	await newPage.waitForTimeout(500);
}

/**
 * @param {object} newPage
 * @async
 */
async function closeBrowser(newPage) {
	await newPage.close();
	//await browser.close();
}

module.exports = {
	removeTicket,
	submitTicket,
	closeBrowser,
};
