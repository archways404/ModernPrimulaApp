// SCHEDULE MODULES
const createURL = require('./schedule/createURL.js');
const getSchedule = require('./schedule/getSchedule.js');

// PRIMULA MODULES
const { attemptLogin, loginRequest } = require('./primula/authentication.js');
const { loginToMain, loginToPrimula } = require('./primula/initPuppeteer.js');
const { promptMFA, getMFA } = require('./primula/2FA.js');
const { primulaNavigate } = require('./primula/navigate.js');
const {
	checkEmployment,
	getEmployment,
	setEmployment,
} = require('./primula/employment.js');
const { prepareInsertData } = require('./primula/prepareData.js');
const { insertWage } = require('./primula/insertWage.js');
const { insertHours } = require('./primula/insertHours.js');
const { insertDates } = require('./primula/insertDates.js');
const { calculate } = require('./primula/calculate.js');
const { getSummary } = require('./primula/getSummary.js');
const { verifyData } = require('./primula/verifyData.js');
const {
	removeTicket,
	submitTicket,
	closeBrowser,
} = require('./primula/handleAction.js');
const { selectHourlyWage } = require('./primula/selectWage.js');

// SCHEDULE FUNCTIONS
const sFunctions = {
	createURL,
	getSchedule,
};

// PRIMULA FUNCTIONS
const pFunctions = {
	selectHourlyWage,
	attemptLogin,
	loginRequest,
	loginToMain,
	loginToPrimula,
	promptMFA,
	getMFA,
	primulaNavigate,
	checkEmployment,
	getEmployment,
	setEmployment,
	prepareInsertData,
	insertWage,
	insertHours,
	insertDates,
	calculate,
	verifyData,
	getSummary,
	removeTicket,
	submitTicket,
	closeBrowser,
};

module.exports = {
	sFunctions,
	pFunctions,
};
