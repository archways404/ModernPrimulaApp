/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const puppeteer = require('puppeteer');

/**
 * INSERT-WAGE MODULE
 *
 * * insertWage
 *
 * The function "insertWage" automatically fills in salary fields with a specified salary value on a web page.
 *
 * This function targets input fields designated for hourly wage entries, identified by a specific XPath expression. It iterates
 * over all found salary input fields, entering the provided salary amount into each. This is particularly
 * useful for tasks such as completing financial forms, payroll entries, or any online document that requires
 * inputting wage information, thereby automating a process that would otherwise be manually repetitive.
 *
 */

/**
 * @param {object} newPage
 * @param {string} salary
 * @returns {Promise<void>}
 * @async
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
