/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const cheerio = require('cheerio');

/**
 * CREATE-SEARCH-QUERY MODULE
 */

/**
 * INFO
 */
async function formatKronoxData(user_submit_month, name, salary) {
	const currentYear = new Date().getFullYear();
	const month = parseInt(user_submit_month, 10) - 1;
	const lastDayOfMonth = new Date(currentYear, month + 1, 0);
	const numberOfDaysInMonth = lastDayOfMonth.getDate();
	const startDate = `${currentYear}-${user_submit_month}-01`;
	const endDate = `${currentYear}-${user_submit_month}-${numberOfDaysInMonth}`;
	const url = `https://schema.mau.se/setup/jsp/Schema.jsp?slutDatum=${endDate}&sprak=SV&sokMedAND=true&startDatum=${startDate}&moment=${name}&resurser=k.BIT%20-%20IT`;
	formattedData = {
		url: url,
		month: user_submit_month,
		year: currentYear,
		salary: salary,
	};
	return formattedData;
}

module.exports = {
	formatKronoxData,
};
