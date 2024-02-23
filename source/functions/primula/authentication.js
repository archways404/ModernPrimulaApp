/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const fetch = require('node-fetch');

/**
 * AUTHENTICATION MODULE
 */

/**
 * INFO
 */
async function login(username, password) {
	try {
		const resLoginAttempt = await loginRequest(username, password);
		console.log('resLoginAttempt: ', resLoginAttempt);
		if (resLoginAttempt === true) {
			return 200;
		} else {
			return 405;
		}
	} catch (error) {
		console.log(error);
		return 500;
	}
}

/**
 * INFO
 */
async function loginRequest(username, password) {
	try {
		const response = await fetch(
			'https://primula.mau.se:10443/remote/logincheck',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: `ajax=1&username=${username}&realm=&credential=${password}`,
			}
		);
		const text = await response.text();
		if (text.includes('ret=1')) {
			console.log('ret1 true');
			return true;
		} else if (text.includes('ret=0')) {
			console.log('ret1 false');
			return false;
		} else {
			return false;
		}
	} catch (error) {
		console.error(`Error: ${error}`);
		return false;
	}
}

module.exports = {
	login,
	loginRequest,
};
