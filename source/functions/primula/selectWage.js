/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const puppeteer = require('puppeteer');

/**
 * SELECT-WAGE MODULE
 * 
 * * selectHourlyWage
 * 
 * The function "selectHourlyWage" selects a specific option, designated by its value, from all dropdown elements identified by a given selector on a web page.
 * 
 * This function iterates through each dropdown (select element) that matches the specified selector and selects an option with the
 * value matching `optionValueToSelect`. 
 * 
 * It's particularly useful in forms where multiple select elements share the same option values
 * and need to be uniformly set to a specific value, such as setting a type of hourly wage across multiple entries in a timesheet application.
 * 
 */

/**
 * @param {object} newPage
 * @param {string} optionValueToSelect 
 * @param {string} selectSelectors
 * @returns {Promise<void>}
 * @async
 */
async function selectHourlyWage(newPage) {
	const optionValueToSelect = '0204';
	const selectSelectors = 'select[title="Typ av ersättning"]';
	const selectElements = await newPage.$$(selectSelectors);
	for (const selectElement of selectElements) {
		await selectElement.select(optionValueToSelect);
	}
}

module.exports = {
	selectHourlyWage,
};
