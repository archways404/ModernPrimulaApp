/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const puppeteer = require('puppeteer');

/**
 * GET-SUMMARY MODULE
 */

/**
 * INFO
 */
async function getTableData(newPage) {
	await newPage.locator('table.frame-color table.tableWithSpace');
	const table = await newPage.$('table.frame-color table.tableWithSpace');
	// Check if the table was found
	if (table) {
		// Get all the rows within the table
		const rows = await table.$$('tr');
		// Define an array to store the table data
		const tableData = [];
		const advancedtableData = [];
		const verifyInputData = [];
		// Loop through each row starting from the second row (skipping the header row)
		for (let i = 1; i < rows.length; i++) {
			const row = rows[i];
			const cells = await row.$$('td');
			const verifyrowData = {
				From: await cells[1].evaluate((cell) => cell.textContent.trim()),
				Antal: await cells[3].evaluate((cell) => cell.textContent.trim()),
			};
			// Extract data from cells specified within the row
			const rowData = {
				Löneart: await cells[0].evaluate((cell) => cell.textContent.trim()),
				From: await cells[1].evaluate((cell) => cell.textContent.trim()),
				Antal: await cells[3].evaluate((cell) => cell.textContent.trim()),
				Belopp: await cells[6].evaluate((cell) => cell.textContent.trim()),
			};
			// Extract data from each cell within the row
			const advancedrowData = {
				Löneart: await cells[0].evaluate((cell) => cell.textContent.trim()),
				From: await cells[1].evaluate((cell) => cell.textContent.trim()),
				Tom: await cells[2].evaluate((cell) => cell.textContent.trim()),
				Antal: await cells[3].evaluate((cell) => cell.textContent.trim()),
				ÁPris: await cells[4].evaluate((cell) => cell.textContent.trim()),
				Tillfällen: await cells[5].evaluate((cell) => cell.textContent.trim()),
				Belopp: await cells[6].evaluate((cell) => cell.textContent.trim()),
			};
			// Push the rowData object into the tableData array
			tableData.push(rowData);
			verifyInputData.push(verifyrowData);
			advancedtableData.push(advancedrowData);
		}
		// Output the table data
		console.log('tableData: ', tableData);
		console.log('verifyInputData: ', verifyInputData);
		console.log('advancedtableData: ', advancedtableData);
		const returndata = {
			tableData: tableData,
			verifyInputData: verifyInputData,
			advancedtableData: advancedtableData,
		};
		return returndata;
	}
}

module.exports = {
	getTableData,
};
