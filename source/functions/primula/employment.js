/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const puppeteer = require('puppeteer');

/**
 * EMPLOYMENT MODULE
 */

/**
 * INFO
 */
async function getEmployment(newPage) {
	try {
		const employment = await newPage.evaluate(() =>
			Array.from(
				document.querySelectorAll(
					'#container > form > table > tbody > tr > td > table > tbody > tr:nth-child(3) > td > select > option'
				)
			).map((element) => element.textContent.trim())
		);
		const data_and_text = [];
		for (let i = 0; i < employment.length; i++) {
			employment_options = employment[i].split(' - ');
			data_option = `${employment_options[0]}`;
			data_text = `${employment_options[1]}`;
			if (data_option !== '' && data_text !== '') {
				data_format = `${data_option},${data_text}`;
				data_format_fixed = data_format.split(',');
				data_and_text.push(data_format_fixed);
			}
		}
		console.log('data_and_text: ', data_and_text);
		return data_and_text;
	} catch (error) {
		console.log(error);
	}
}

/**
 * INFO
 */
async function setEmployment(newPage, selected_option) {
	try {
		const [response_select_option] = await Promise.all([
			newPage.waitForNavigation(),
			newPage.waitForSelector(
				'#container > form > table > tbody > tr > td > table > tbody > tr:nth-child(3) > td > select'
			),
			newPage.select(
				'#container > form > table > tbody > tr > td > table > tbody > tr:nth-child(3) > td > select',
				selected_option
			),
			newPage.click('input[type="submit"]'),
		]);
	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	getEmployment,
	setEmployment,
};
