/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const puppeteer = require('puppeteer');
const { promisify } = require('util');
const { exec: execCallback } = require('child_process');
const exec = promisify(execCallback); // Promisify exec for async/await usage

// headless: true or false
const headless = true;

// Declare variables
let launchOptions;

// AUTH MODULE
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
// AUTH MODULE
async function loginRequest(username, password) {
	try {
		const curlCommand = `curl -X POST -d "ajax=1&username=${username}&realm=&credential=${password}" https://primula.mau.se:10443/remote/logincheck 2>/dev/null`;
		const { stdout, stderr } = await exec(curlCommand);
		if (stdout.includes('ret=1')) {
			console.log('ret1 true');
			return true;
		} else if (stdout.includes('ret=0')) {
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

// REGULAR MODULES
async function loginToMain(username, password) {
	try {
		if (headless === true) {
			launchOptions = {
				headless: 'new',
				args: ['--no-sandbox'],
			};
		} else if (headless === false) {
			launchOptions = {
				headless: false,
			};
		}
		const browser = await puppeteer.launch(launchOptions);
		console.log('Browser is up and running: ', launchOptions);
		const page = await browser.newPage();
		await page.goto('https://primula.mau.se:10443/remote/login?lang=en');
		await page.type('#username', username);
		await page.type('#credential', password);
		const [response] = await Promise.all([
			page.waitForNavigation(),
			page.click('button[id=login_button]'),
		]);
		const globe = page.locator(
			'xpath=//html/body/section/div/div/div[2]/div[2]/div/button[1]'
		);
		await globe.click();
		const getNewPageWhenLoaded = async () => {
			return new Promise((x) =>
				browser.on('targetcreated', async (target) => {
					if (target.type() === 'page') {
						const newPage = await target.page();
						const newPagePromise = new Promise((y) =>
							newPage.once('domcontentloaded', () => y(newPage))
						);
						const isPageLoaded = await newPage.evaluate(
							() => document.readyState
						);
						return isPageLoaded.match('complete|interactive')
							? x(newPage)
							: x(newPagePromise);
					}
				})
			);
		};
		const newPagePromise = getNewPageWhenLoaded();
		const newPage = await newPagePromise;
		await newPage.waitForNetworkIdle();
		return newPage;
	} catch (error) {
		console.log(error);
	}
}

async function loginToPrimula(newPage, username, password) {
	const [response_login] = await Promise.all([
		newPage.waitForNavigation(),
		// Wait for the element to be loaded on the page
		await newPage.waitForSelector('div[aria-label="Malmö universitet"]'),

		// Click on the element
		await newPage.click('div[aria-label="Malmö universitet"]'),

		//newPage.click('xpath=//html/body/div[2]/div[2]/div/main/div/div/form/div[1]/div[61]')
	]);
	let fix_username = `${username}@mau.se`;
	await newPage.type('#userNameInput', fix_username);
	await newPage.type('#passwordInput', password);
	const [response_post_login] = await Promise.all([
		newPage.waitForNavigation(),
		newPage.click('#submitButton'),
	]);
}

async function checkMFA(newPage) {
	try {
		const valid = await newPage.waitForSelector('#validEntropyNumber', {
			timeout: 12000,
		});
		if (valid) {
			return true;
		} else {
			return false;
		}
	} catch (error) {
		return false;
	}
}

// CHECK COMMENT
async function getMFA(newPage) {
	const mfaNumbers = await newPage.evaluate(() => {
		const mfaElement = document.querySelector('#validEntropyNumber');
		return mfaElement.textContent.trim();
	});
	console.log('mfaNumbers: ', mfaNumbers);
	return mfaNumbers;
	// SEND MFA NUMBERS VIA IPC
}

async function primulaNavigate(newPage) {
	const [response_language_swe] = await Promise.all([
		(SweBTN = newPage.locator(
			'xpath=//html/body/div/div[2]/div[2]/table[1]/tbody/tr/td[1]/form/input'
		)),
		SweBTN.click(),
	]);
	const [responseForm] = await Promise.all([
		(formLocation = newPage.waitForSelector(
			'xpath=//html/body/div/div[2]/div[2]/ul/li[1]/ul/li[3]/a'
		)),
		(form = newPage.locator(
			'xpath=//html/body/div/div[2]/div[2]/ul/li[1]/ul/li[3]/a'
		)),
		form.click(),
		newPage.waitForNavigation(),
	]);
	await newPage.waitForNetworkIdle();
	const [response_emp_id] = await Promise.all([
		newPage.waitForNavigation(),
		newPage.select(
			'xpath=//html/body/div/div[2]/div[5]/div/div[2]/form/table/tbody/tr/td/table/tbody/tr[2]/td[1]/select',
			'Timersättning (dagrapport)'
		),
	]);
	await newPage.waitForNetworkIdle();
}

async function checkEmployment(newPage) {
	try {
		const valid = await newPage.waitForSelector(
			'xpath=//html/body/div/div[2]/div[5]/div/div[2]/form/table/tbody/tr/td/table/tbody/tr[3]/td/select',
			{ timeout: 5000 }
		);
		if (valid) {
			return true;
		} else {
			return false;
		}
	} catch (error) {
		return false;
	}
}

// CHECK COMMENT
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

async function prepareInsertData(newPage, data) {
	for (row in data) {
		console.log('prepareInsertData (row): ', data[row]);
	}
	let counter = 1;
	while (counter != data.length) {
		const buttonSelector = 'input[type="submit"][value="Ny rad"]';
		await newPage.waitForSelector(buttonSelector);
		const button = await newPage.$(buttonSelector);
		await button.click();
		await newPage.waitForNavigation();
		console.log('button clicked: ', counter);
		counter++;
	}
}

async function selectHourlyWage(newPage) {
	const optionValueToSelect = '0204';
	const selectSelectors = 'select[title="Typ av ersättning"]';
	const selectElements = await newPage.$$(selectSelectors);
	for (const selectElement of selectElements) {
		await selectElement.select(optionValueToSelect);
	}
}

async function insertWage(newPage, salary) {
	const salaryElements = await newPage.$x('//input[@title="Timlön"]');
	for (const salaryElement of salaryElements) {
		if (salaryElement) {
			await salaryElement.click(salary);
			await salaryElement.type(salary);
			console.log('Filled salary: ', salary);
		}
	}
}

async function insertDates(newPage, data, year_value, month_value) {
	for (let i = 0; i < data.length; i++) {
		const dateElements = await newPage.$x('//input[@title="Datum"]');
		if (i < dateElements.length) {
			const insert_date = await data[i].Date;
			console.log(insert_date);
			const year_variable = await year_value.toString().slice(-2);
			const input_date = `${year_variable}${month_value}${insert_date}`;
			const dateElement = dateElements[i];
			if (dateElement) {
				const currentValue = await dateElement.evaluate((el) => el.value);
				if (!currentValue) {
					await dateElement.click();
					await dateElement.type(input_date);
					//await newPage.waitForTimeout(500)
					console.log(`Filled date ${input_date}`);
				}
			}
		}
	}
}

async function insertHours(newPage, data) {
	const hourElements = await newPage.$x('//input[@title="Antal timmar"]');
	for (let i = 0; i < data.length && i < hourElements.length; i++) {
		const insert_hours = data[i].Hours;
		const hourElement = hourElements[i];
		if (hourElement) {
			const currentValue = await hourElement.evaluate((el) => el.value);
			if (!currentValue) {
				await hourElement.click();
				await hourElement.type(insert_hours);
				console.log(`Filled hours ${insert_hours}`);
			}
		}
	}
}

async function pressCalculate(newPage) {
	await newPage.evaluate(() => {
		document.querySelector('input[type="submit"][value="Beräkna"]').click();
	});
	await newPage.waitForNavigation();
	console.log('Calculating...');
}

async function getTableData(newPage) {
	await newPage.locator('table.frame-color table.tableWithSpace');
	const table = await newPage.$('table.frame-color table.tableWithSpace');
	// Check if the table was found
	if (table) {
		// Get all the rows within the table
		const rows = await table.$$('tr');
		// Define an array to store the table data
		const tableData = [];
		const advancedtableData = [];
		const verifyInputData = [];
		// Loop through each row starting from the second row (skipping the header row)
		for (let i = 1; i < rows.length; i++) {
			const row = rows[i];
			const cells = await row.$$('td');
			const verifyrowData = {
				From: await cells[1].evaluate((cell) => cell.textContent.trim()),
				Antal: await cells[3].evaluate((cell) => cell.textContent.trim()),
			};
			// Extract data from cells specified within the row
			const rowData = {
				Löneart: await cells[0].evaluate((cell) => cell.textContent.trim()),
				From: await cells[1].evaluate((cell) => cell.textContent.trim()),
				Antal: await cells[3].evaluate((cell) => cell.textContent.trim()),
				Belopp: await cells[6].evaluate((cell) => cell.textContent.trim()),
			};
			// Extract data from each cell within the row
			const advancedrowData = {
				Löneart: await cells[0].evaluate((cell) => cell.textContent.trim()),
				From: await cells[1].evaluate((cell) => cell.textContent.trim()),
				Tom: await cells[2].evaluate((cell) => cell.textContent.trim()),
				Antal: await cells[3].evaluate((cell) => cell.textContent.trim()),
				ÁPris: await cells[4].evaluate((cell) => cell.textContent.trim()),
				Tillfällen: await cells[5].evaluate((cell) => cell.textContent.trim()),
				Belopp: await cells[6].evaluate((cell) => cell.textContent.trim()),
			};
			// Push the rowData object into the tableData array
			tableData.push(rowData);
			verifyInputData.push(verifyrowData);
			advancedtableData.push(advancedrowData);
		}
		// Output the table data
		console.log('tableData: ', tableData);
		console.log('verifyInputData: ', verifyInputData);
		console.log('advancedtableData: ', advancedtableData);
		const returndata = {
			tableData: tableData,
			verifyInputData: verifyInputData,
			advancedtableData: advancedtableData,
		};
		return returndata;
	}
}

async function VerifyData(data, advancedtableData) {
	let validFormData = 1;
	const filteredAdvancedData = advancedtableData.filter(
		(item) => item['Löneart'] !== '4200  Sem.ers övriga'
	);
	console.log('filteredAdvancedData: ', filteredAdvancedData);

	// Check if the lengths of the datasets match
	const uniqueFromValues = [
		...new Set(advancedtableData.map((item) => item.From)),
	];
	const lists = uniqueFromValues.map((fromValue) => {
		const timlonItems = advancedtableData
			.filter(
				(item) => item['Löneart'] === '0204  Timlön' && item.From === fromValue
			)
			.map((item) => item.Antal);
		return {
			From: fromValue,
			Antal: timlonItems,
		};
	});

	console.log(lists);
	if (lists.length === data.length) {
		for (let i = 0; i < lists.length; i++) {
			const fromValue = lists[i].From;
			const antalHours = lists[i].Antal;
			const dayPart = fromValue.split('-').slice(-1)[0].trim();
			const dataPart = data[i].Date;
			const hourPart = data[i].Hours;
			console.log(antalHours[0]);
			let hoursDot = antalHours[0].replace(',', '.');
			console.log(hoursDot);
			console.log(hoursDot[2]);
			if (hoursDot[2] != 0) {
				hoursDot = `${hoursDot[0]}${hoursDot[1]}${hoursDot[2]}`;
			} else {
				hoursDot = hoursDot[0];
			}
			if (dayPart === dataPart && hoursDot === hourPart) {
				console.log(`Row ${i + 1}: Matches`);
				console.log('dayPart: ', dayPart, ' dataPart: ', dataPart);
				console.log('hoursDot: ', hoursDot, ' hourPart: ', hourPart);
			} else {
				console.log(`Row ${i + 1}: Does not match`);
				console.log('Day part: ', dayPart, ' Data part: ', dataPart);
				validFormData = 0;
			}
		}
	} else {
		console.log('The number of items in the lists does not match.');
	}
	console.log('validFormData: ', validFormData);
	return validFormData;
}

async function removeArende(newPage) {
	await newPage.on('dialog', async (dialog) => {
		console.log('Dialog message:', dialog.message());
		await dialog.accept();
	});
	const throwAway = await newPage.locator(
		'input[name="removeArende"][title="Kasta"]'
	);
	await throwAway.click();
	await newPage.waitForTimeout(500);
}

async function submitArende(newPage) {
	await newPage.on('dialog', async (dialog) => {
		console.log('Dialog message:', dialog.message());
		await dialog.accept();
	});
	const submitA = await newPage.locator('input[type="submit"][value="Skicka"]');
	await submitA.click();
	await newPage.waitForTimeout(500);
}

async function closeBrowser(newPage) {
	await newPage.close();
	//await browser.close();
}

module.exports = {
	closeBrowser,
	login,
	loginRequest,
	loginToMain,
	loginToPrimula,
	checkMFA,
	getMFA,
	primulaNavigate,
	checkEmployment,
	getEmployment,
	setEmployment,
	prepareInsertData,
	selectHourlyWage,
	insertWage,
	insertDates,
	insertHours,
	pressCalculate,
	getTableData,
	VerifyData,
	removeArende,
	submitArende,
};
