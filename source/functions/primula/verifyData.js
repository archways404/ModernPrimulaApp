/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const puppeteer = require('puppeteer');

/**
 * VERIFY-DATA MODULE
 *
 * * verifyData
 *
 * The function "verifyData" verifies that the data extracted and transformed from a webpage matches the expected dataset.
 *
 * This function compares detailed entries from `advancedtableData` against a simpler `data` format, focusing on specific fields like 'Löneart', 'From', and 'Antal' to ensure consistency and correctness of the data transformation process.
 *
 * It filters out entries from `advancedtableData` based on 'Löneart' values, constructs a list of unique 'From' values, and then verifies each entry against the corresponding entry in `data`.
 *
 * The function logs detailed comparisons and concludes by indicating whether the data is valid based on the matching process.
 *
 */

/**
 * @param {Array<Object>} data
 * @param {Array<Object>} advancedtableData
 * @returns {Promise<number>}
 * @async
 */
async function verifyData(data, advancedtableData) {
	let validFormData = 1;
	const filteredAdvancedData = advancedtableData.filter(
		(item) => item['Löneart'] !== '4200  Sem.ers övriga'
	);
	console.log('filteredAdvancedData: ', filteredAdvancedData);

	// Check if the lengths of the datasets match
	const uniqueFromValues = [
		...new Set(advancedtableData.map((item) => item.From)),
	];
	const lists = uniqueFromValues.map((fromValue) => {
		const timlonItems = advancedtableData
			.filter(
				(item) => item['Löneart'] === '0204  Timlön' && item.From === fromValue
			)
			.map((item) => item.Antal);
		return {
			From: fromValue,
			Antal: timlonItems,
		};
	});

	console.log(lists);
	if (lists.length === data.length) {
		for (let i = 0; i < lists.length; i++) {
			const fromValue = lists[i].From;
			const antalHours = lists[i].Antal;
			const dayPart = fromValue.split('-').slice(-1)[0].trim();
			const dataPart = data[i].Date;
			const hourPart = data[i].Hours;
			console.log(antalHours[0]);
			let hoursDot = antalHours[0].replace(',', '.');
			console.log(hoursDot);
			console.log(hoursDot[2]);
			if (hoursDot[2] != 0) {
				hoursDot = `${hoursDot[0]}${hoursDot[1]}${hoursDot[2]}`;
			} else {
				hoursDot = hoursDot[0];
			}
			if (dayPart === dataPart && hoursDot === hourPart) {
				console.log(`Row ${i + 1}: Matches`);
				console.log('dayPart: ', dayPart, ' dataPart: ', dataPart);
				console.log('hoursDot: ', hoursDot, ' hourPart: ', hourPart);
			} else {
				console.log(`Row ${i + 1}: Does not match`);
				console.log('Day part: ', dayPart, ' Data part: ', dataPart);
				validFormData = 0;
			}
		}
	} else {
		console.log('The number of items in the lists does not match.');
	}
	console.log('validFormData: ', validFormData);
	return validFormData;
}

module.exports = {
	verifyData,
};
