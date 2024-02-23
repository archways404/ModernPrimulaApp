/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const puppeteer = require('puppeteer');

/**
 * INSERT-HOURS MODULE
 * 
 * * insertHours
 * 
 * The function "insertHours" populates multiple input fields on a webpage with hours from a given data array. 
 * 
 * This function is specifically designed to target input fields that accept the number of hours, identified by a
 * unique XPath query. It iterates through each item in the data array and the corresponding input
 * field on the page, inserting the hours value where applicable. This automation is particularly
 * useful for tasks such as filling out timesheets or any form where inputting hours is required,
 * streamlining the process by automating repetitive data entry.
 * 
 */

/**
 * @param {object} newPage
 * @param {Array<{Hours: string}>} data 
 * @returns {Promise<void>}
 * @async
 */
async function insertHours(newPage, data) {
	const hourElements = await newPage.$x('//input[@title="Antal timmar"]');
	for (let i = 0; i < data.length && i < hourElements.length; i++) {
		const insert_hours = data[i].Hours;
		const hourElement = hourElements[i];
		if (hourElement) {
			const currentValue = await hourElement.evaluate((el) => el.value);
			if (!currentValue) {
				await hourElement.click();
				await hourElement.type(insert_hours);
				console.log(`Filled hours ${insert_hours}`);
			}
		}
	}
}

module.exports = {
	insertHours,
};
