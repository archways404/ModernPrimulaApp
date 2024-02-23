/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const cheerio = require('cheerio');

/**
 * CREATE-URL MODULE
 *
 * * createURL
 *
 * The function "createURL" asynchronously constructing a URL with specified parameters and packaging additional information.
 *
 * The function "formatKronoxData" calculates the start and end dates for a given month and constructs a URL to fetch schedule data from the Kronox system.
 * It then packages this URL with additional user-specific information into an object.
 */

/**
 * @param {String} user_submit_month
 * @param {String} name
 * @param {String} salary
 * @returns {Object} modifiedData
 */
async function createURL(user_submit_month, name, salary) {
	const currentYear = new Date().getFullYear();
	const month = parseInt(user_submit_month, 10) - 1;
	const lastDayOfMonth = new Date(currentYear, month + 1, 0);
	const numberOfDaysInMonth = lastDayOfMonth.getDate();
	const startDate = `${currentYear}-${user_submit_month}-01`;
	const endDate = `${currentYear}-${user_submit_month}-${numberOfDaysInMonth}`;
	const url = `https://schema.mau.se/setup/jsp/Schema.jsp?slutDatum=${endDate}&sprak=SV&sokMedAND=true&startDatum=${startDate}&moment=${name}&resurser=k.BIT%20-%20IT`;
	modifiedData = {
		url: url,
		month: user_submit_month,
		year: currentYear,
		salary: salary,
	};
	return modifiedData;
}

module.exports = createURL;
