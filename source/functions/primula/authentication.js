/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const fetch = require('node-fetch');

/**
 * AUTHENTICATION MODULE
 * 
 * * attemptLogin
 * 
 * The function "attemptLogin" attempts to log in with the provided username and password.
 * 
 * This function tries to log in using the credentials provided by calling the `loginRequest` function.
 * It logs the result of the login attempt. If the login is successful (as indicated by `loginRequest` returning true),
 * it returns a status code of 200. If the login fails, it returns 405. If an exception occurs during the process,
 * it catches the exception, logs the error, and returns 500.
 * 
 * * loginRequest
 * 
 * The function "loginRequest" sends a login request to a predefined URL with the provided username and password.
 * 
 * This function performs an asynchronous POST request to a specified URL intended for login checks, 
 * sending the username and password as form-urlencoded data. It evaluates the response text to determine 
 * the success of the login attempt. If the response text includes 'ret=1', the login is considered successful, 
 * and true is returned. If 'ret=0' is found or if the response doesn't match the expected success criteria, 
 * false is returned to indicate a failed login attempt. In case of a fetch error, the error is logged, 
 * and false is returned.
 * 
 */

/**
 * @param {string} username
 * @param {string} password
 * @returns {Promise<number>}
 * @async
 */
async function attemptLogin(username, password) {
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
 * @param {string} username 
 * @param {string} password
 * @returns {Promise<boolean>}
 * @async
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
	attemptLogin,
	loginRequest,
};
