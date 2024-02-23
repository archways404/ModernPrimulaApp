const { sFunctions, pFunctions } = require('../../functions/imports.js');

async function main() {
	try {
		console.log(sFunctions);
		const URL = await sFunctions.createURL('02', 'test', 'salary');
		console.log(URL);
		const schedule = await sFunctions.getSchedule(URL);
		console.log(schedule);
	} catch (error) {
		console.log(error);
	}
}

main();
