/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const puppeteer = require('puppeteer');

/**
 * INSERT-DATES MODULE
 */

/**
 * INFO
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
