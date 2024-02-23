/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const puppeteer = require('puppeteer');

/**
 * INSERT-HOURS MODULE
 */

/**
 * INFO
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
