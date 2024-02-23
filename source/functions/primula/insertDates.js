/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const puppeteer = require('puppeteer');

/**
 * INSERT-DATES MODULE
 * 
 * * insertDates
 * 
 * The function "insertDates" fills in date fields on a webpage with dates derived from the provided data array.
 * 
 * It constructs the dates using year and month values, appending the day from each data item. This function is
 * specifically designed to interact with date input fields identified by a specific XPath selector.
 * 
 * It iterates through each item in the data array, formats a date string, and inserts it into the
 * corresponding date input field on the page. This automation is useful for batch processing of dates
 * in web forms, especially when the dates need to be dynamically generated or formatted according to specific requirements.
 * 
 */

/**
 * @param {object} newPage
 * @param {Array<{Date: string}>} data
 * @param {number|string} year_value
 * @param {number|string} month_value
 * @returns {Promise<void>}
 * @async
 */
async function insertDates(newPage, data, year_value, month_value) {
	for (let i = 0; i < data.length; i++) {
		const dateElements = await newPage.$x('//input[@title="Datum"]');
		if (i < dateElements.length) {
			const insert_date = await data[i].Date;
			console.log(insert_date);
			const year_variable = await year_value.toString().slice(-2);
			const input_date = `${year_variable}${month_value}${insert_date}`;
			const dateElement = dateElements[i];
			if (dateElement) {
				const currentValue = await dateElement.evaluate((el) => el.value);
				if (!currentValue) {
					await dateElement.click();
					await dateElement.type(input_date);
					//await newPage.waitForTimeout(500)
					console.log(`Filled date ${input_date}`);
				}
			}
		}
	}
}

module.exports = {
	insertDates,
};
