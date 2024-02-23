/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const puppeteer = require('puppeteer');

/**
 * INSERT-WAGE MODULE
 */

/**
 * INFO
 */
async function insertWage(newPage, salary) {
	const salaryElements = await newPage.$x('//input[@title="Timlön"]');
	for (const salaryElement of salaryElements) {
		if (salaryElement) {
			await salaryElement.click(salary);
			await salaryElement.type(salary);
			console.log('Filled salary: ', salary);
		}
	}
}

module.exports = {
	insertWage,
};
