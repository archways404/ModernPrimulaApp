/* eslint-disable no-unused-vars */
import { app, shell, BrowserWindow, ipcMain, nativeImage } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
const { autoUpdater, AppUpdater } = require('electron-updater');

const path = require('path');
const url = require('url');

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

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
	// Set app user model id for windows
	electronApp.setAppUserModelId('com.electron');

	// Default open or close DevTools by F12 in development
	// and ignore CommandOrControl + R in production.
	// see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils

	app.on('browser-window-created', (_, window) => {
		optimizer.watchWindowShortcuts(window);
	});

	createWindow();
	autoUpdater.checkForUpdatesAndNotify();

	app.on('activate', function () {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

// Disable auto-download
autoUpdater.autoDownload = true;

// Check for updates
ipcMain.on('check_for_updates', () => {
	autoUpdater.checkForUpdates();
});

// Download update
ipcMain.on('download_update', () => {
	autoUpdater.downloadUpdate();
});

// Restart and install update
ipcMain.on('restart_app', () => {
	autoUpdater.quitAndInstall();
});

// Notify renderer when an update is available
autoUpdater.on('update-available', () => {
	mainWindow.webContents.send('update_available');
});

// Notify renderer when an update has been downloaded
autoUpdater.on('update-downloaded', () => {
	mainWindow.webContents.send('update_downloaded');
});

// Listen for IPC messages and handle them as needed
ipcMain.on('start-verifyLoginDetails-task', async (event, arg) => {
	console.log(arg); // prints the argument sent from renderer process
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

let globalPageContext = null;

// Listen for IPC messages and handle them as needed
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

ipcMain.on('start-formSubmit-task', async (event, arg) => {
	console.log(arg); // prints the argument sent from renderer process
	const username = arg.username;
	const password = arg.password;
	const month = arg.month;
	const salary = arg.salary;
	const data = arg.data;
	console.log('arg 89: ', arg);

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
