/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const cheerio = require('cheerio');

/**
 * GET-SCHEDULE MODULE
 *
 * * getSchedule
 *
 * The function "getSchedule" fetches the HTML content from the given Kronox URL, parses it to find schedule data, and formats this data into a more usable form.
 *
 * It specifically looks for elements with classes 'data-grey' and 'data-white' to identify schedule entries, extracts dates and times, calculates the duration of each entry in hours, and formats each entry as a string of the form "DD,HH.H" where DD is the day and HH.H is the time in hours.
 */

/**
 * @param {Object} modifiedData
 * @returns {Promise<Array<string>>}
 * @async
 * @throws {Error}
 */
async function getSchedule(modifiedData) {
	try {
		const response = await fetch(modifiedData.url);
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const html = await response.text();
		const $ = cheerio.load(html);
		const data = [];

		$('.data-grey, .data-white').each((index, row) => {
			const cells = $(row).find('td');
			const dateText = cells.eq(2).text().trim();
			const time = cells.eq(3).text().trim();
			let date = '';
			const dateMatch = dateText.match(/\d+/);
			if (dateMatch) {
				date = dateMatch[0].padStart(2, '0');
			}
			if (date.length === 1) {
				date = `0${date}`;
			}
			// Check if time is in the expected format
			const timeMatch = time.match(/(\d{2}:\d{2})-(\d{2}:\d{2})/);
			if (timeMatch) {
				const startTime = timeMatch[1];
				const endTime = timeMatch[2];
				const [startHour, startMinutes] = startTime.split(':').map(Number);
				const [endHour, endMinutes] = endTime.split(':').map(Number);
				const startInMinutes = startHour * 60 + startMinutes;
				const endInMinutes = endHour * 60 + endMinutes;
				const timeTotalInMinutes = endInMinutes - startInMinutes;
				const timeTotal = timeTotalInMinutes / 60;
				if (!isNaN(timeTotal)) {
					const formattedData = `${date},${timeTotal}`;
					data.push(formattedData);
				}
			}
		});
		return data;
	} catch (error) {
		console.error(error);
	}
}

module.exports = {
	getSchedule,
};
