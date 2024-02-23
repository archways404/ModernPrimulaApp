/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const puppeteer = require('puppeteer');

/**
 * SELECT-WAGE MODULE
 */

/**
 * INFO
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
	prepareInsertData,
};
