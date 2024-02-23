/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const puppeteer = require('puppeteer');

/**
 * EMPLOYMENT MODULE
 * 
 * * getEmployment
 * 
 * The function "getEmployment" retrieves employment options from a dropdown on a webpage.
 * 
 * This function navigates the DOM of the given page to find a specific dropdown menu. It then collects
 * all available options within this dropdown. Each option's text is split by " - ", and both the prefix
 * (assumed to be a data option) and the suffix (assumed to be the descriptive text) are captured and returned
 * as an array of arrays, where each sub-array contains the option value and its text description.
 *
 * * setEmployment
 * 
 * The function "setEmployment" selects an employment option from a dropdown and submits the form on a webpage.
 * 
 * This function waits for the specified dropdown menu to become available, selects an option based
 * on the provided `selected_option` value, and then clicks a submit button to trigger any subsequent
 * actions related to the selection. It waits for the page navigation to complete, indicating that
 * the submission has been processed.
 * 
 */

/**
 * @param {object} newPage 
 * @returns {Promise<Array<Array<string>>>}
 * @async
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
 * @param {object} newPage
 * @param {string} selected_option
 * @returns {Promise<void>}
 * @async
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
