const fetch = require('node-fetch');
const { login } = require('../functions/primulaFunction');

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
async function main() {
	const testing = await loginRequest('username', 'password');
	console.log(testing);
}

main();
