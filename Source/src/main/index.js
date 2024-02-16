/* eslint-disable no-unused-vars */
import { app, shell, BrowserWindow, ipcMain, nativeImage } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
const { autoUpdater } = require('electron-updater');

const path = require('path');

let mainWindow;

const fetchSchedule = require('../../functions/fetchSchedule.js');
const primulaFunction = require('../../functions/primulaFunction.js');

const iconPath = path.join(__dirname, 'logo-t.png');
const icon = nativeImage.createFromPath(iconPath);

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 900,
		height: 670,
		show: false,
		autoHideMenuBar: true,
		icon: icon,
		webPreferences: {
			preload: join(__dirname, '../preload/index.js'),
			sandbox: false,
			nodeIntegration: true,
			contextIsolation: false, // Note: Turning off context isolation is a security risk
		},
	});

	// setting icon for macOS
	if (app.dock) {
		app.dock.setIcon(icon);
	}

	mainWindow.on('ready-to-show', () => {
		mainWindow.show();
	});

	mainWindow.webContents.setWindowOpenHandler((details) => {
		shell.openExternal(details.url);
		return { action: 'deny' };
	});

	// DISABLED FOR TESTING
	//mainWindow.webContents.openDevTools();

	mainWindow.webContents.on('did-finish-load', () => {
		mainWindow.webContents.send('set-dirname', __dirname);
	});

	// HMR for renderer base on electron-vite cli.
	// Load the remote URL for development or the local html file for production.
	if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
		mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
	} else {
		mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
	}
}

app.whenReady().then(() => {
	electronApp.setAppUserModelId('com.electron');

	app.on('browser-window-created', (_, window) => {
		optimizer.watchWindowShortcuts(window);
	});

	createWindow();

	app.on('activate', function () {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

// UPDATE MODULES
autoUpdater.autoDownload = false;

ipcMain.on('check_for_updates', () => {
	autoUpdater.checkForUpdates();
});

ipcMain.on('download_update', () => {
	autoUpdater.downloadUpdate();
});

ipcMain.on('restart_app', () => {
	autoUpdater.quitAndInstall();
});

autoUpdater.on('update-available', (info) => {
	console.log(info);
	mainWindow.webContents.send('update_available');
});

autoUpdater.on('update-not-available', (info) => {
	console.log(info);
	mainWindow.webContents.send('update-not-available');
});

autoUpdater.on('update-error', (err) => {
	console.log(err);
	mainWindow.webContents.send('update-error', err);
});

autoUpdater.on('update-downloaded', () => {
	mainWindow.webContents.send('update_downloaded');
});

// LOGIN MODULE
ipcMain.on('start-verifyLoginDetails-task', async (event, arg) => {
	console.log(arg);
	const username = arg.username;
	const password = arg.password;
	try {
		const login = await primulaFunction.login(username, password);
		console.log(login);
		if (login === 200) {
			console.log('Login successful');
			event.sender.send('verifyLoginDetails-task-complete', {
				status: 'success',
				username: username,
				password: password,
			});
		} else {
			console.log('Login failed');
			event.sender.send('verifyLoginDetails-task-complete', {
				status: 'failed',
				username: username,
				password: password,
			});
		}
	} catch (error) {
		console.log(error);
		event.sender.send('verifyLoginDetails-task-complete', { status: error });
	}
});

// PRIMULA MODULES
let globalPageContext = null;
// FETCH SCHEDULE DATA
ipcMain.on('start-fetchSchedule-task', async (event, arg) => {
	try {
		console.log(arg);
		const month = arg.month;
		const name = arg.name;
		const salary = arg.salary;
		const data = await fetchSchedule.formatKronoxData(month, name, salary);
		console.log(data);
		const kronoxData = await fetchSchedule.getKronoxData(data);
		console.log(kronoxData);
		// Handle the background task and send a response back if needed
		event.sender.send('fetchSchedule-task-complete', kronoxData);
	} catch (error) {
		console.log(error);
	}
});

// LOGIN TO PRIMULA & NAVIGATE
ipcMain.on('start-formSubmit-task', async (event, arg) => {
	console.log(arg);
	const username = arg.username;
	const password = arg.password;

	const newPage = await primulaFunction.loginToMain(username, password);
	globalPageContext = newPage;

	await primulaFunction.loginToPrimula(newPage, username, password);

	const checkMFA = await primulaFunction.checkMFA(newPage);
	console.log(checkMFA);
	if (checkMFA === true) {
		const mfaCode = await primulaFunction.getMFA(newPage);
		mainWindow.webContents.send('MFA', mfaCode);
	}

	await primulaFunction.primulaNavigate(newPage);
	await mainWindow.webContents.send('MFAdone', 'done');

	const checkEmployment = await primulaFunction.checkEmployment(newPage);
	console.log('CheckEmployment:', checkEmployment);

	if (checkEmployment === true) {
		const getOptions = await primulaFunction.getEmployment(newPage);
		console.log('getOptions: ', getOptions);
		mainWindow.webContents.send('EMP', getOptions);
	}
});
// SET EMPLOYMENT IF AVAILABLE
ipcMain.on('EMP_data', async (event, clientData) => {
	console.log('clientData: ', clientData);
	const selected_option = clientData.empValue;
	const month = clientData.month;
	const salary = clientData.salary;
	const data = clientData.data;
	const newPage = globalPageContext;
	const year = new Date().getFullYear();
	console.log('newPage: ', newPage);

	//await primulaFunction.mainCore(newPage, selected_option, month, salary, data, year)

	try {
		await primulaFunction.setEmployment(newPage, selected_option);
	} catch (error) {
		console.log(error);
	}
	try {
		await primulaFunction.prepareInsertData(newPage, data);
	} catch (error) {
		console.log(error);
	}
	try {
		await primulaFunction.selectHourlyWage(newPage);
	} catch (error) {
		console.log(error);
	}
	try {
		await primulaFunction.insertWage(newPage, salary);
	} catch (error) {
		console.log(error);
	}
	try {
		await primulaFunction.insertHours(newPage, data);
	} catch (error) {
		console.log(error);
	}
	try {
		await primulaFunction.insertDates(newPage, data, year, month);
	} catch (error) {
		console.log(error);
	}
	try {
		await primulaFunction.pressCalculate(newPage);
	} catch (error) {
		console.log(error);
	}
	try {
		const logicData = await primulaFunction.getTableData(newPage);
		const tableData = logicData.tableData;
		const verifyInputData = logicData.verifyInputData;
		const advancedtableData = logicData.advancedtableData;
		const validFormDataTEST = await primulaFunction.VerifyData(
			data,
			advancedtableData
		);
		console.log('validFormDataTEST: ', validFormDataTEST);
		if (validFormDataTEST) {
			console.log('success');
			mainWindow.webContents.send('Results', tableData);
		}
	} catch (error) {
		console.log(error);
	}
	event.sender.send('formSubmit-task-complete', 'success');
});
// REMOVE TICKET
ipcMain.on('removeTicket', async (event, arg) => {
	const newPage = globalPageContext;
	console.log('newPage: ', newPage);
	try {
		await primulaFunction.removeArende(newPage);
		await primulaFunction.closeBrowser(newPage);
		mainWindow.webContents.send('details', 'removed');
	} catch (error) {
		console.log(error);
	}
});
// SUBMIT TICKET
ipcMain.on('sendTicket', async (event, arg) => {
	const newPage = globalPageContext;
	console.log('newPage: ', newPage);
	try {
		await primulaFunction.submitArende(newPage);
		await primulaFunction.closeBrowser(newPage);
		mainWindow.webContents.send('details', 'removed');
	} catch (error) {
		console.log(error);
	}
});
