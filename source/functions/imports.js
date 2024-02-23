// SCHEDULE MODULES
const createURL = require('schedule/createURL.js');
const getSchedule = require('schedule/getSchedule.js');

// PRIMULA MODULES
const authentication = require('primula/authentication.js');
const initPuppeteer = require('primula/initPuppeteer.js');
const TwoFA = require('primula/2FA.js');
const navigation = require('primula/navigate.js');
const employment = require('primula/employment.js');
const prepareData = require('primula/prepareData.js');
const insertWage = require('primula/insertWage.js');
const insertHours = require('primula/insertHours.js');
const insertDates = require('primula/insertDates.js');
const calculate = require('primula/calculate.js');
const verifyData = require('primula/verifyData.js');
const handleAction = require('primula/handleAction.js');

// SCHEDULE FUNCTIONS
const sFunctions = {
	createURL,
	getSchedule,
};

// PRIMULA FUNCTIONS
const pFunctions = {
	authentication,
	initPuppeteer,
	TwoFA,
	navigation,
	employment,
	prepareData,
	insertWage,
	insertHours,
	insertDates,
	calculate,
	verifyData,
	handleAction,
};

module.exports = {
	sFunctions,
	pFunctions,
};
