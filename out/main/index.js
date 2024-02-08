"use strict";
const electron = require("electron");
const path$1 = require("path");
const utils = require("@electron-toolkit/utils");
const { autoUpdater } = require("electron-updater");
const path = require("path");
require("url");
let mainWindow;
const fetchSchedule = require("../../functions/fetchSchedule.js");
const primulaFunction = require("../../functions/primulaFunction.js");
const iconPath = path.join(__dirname, "logo-t.png");
const icon = electron.nativeImage.createFromPath(iconPath);
function createWindow() {
  mainWindow = new electron.BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    icon,
    webPreferences: {
      preload: path$1.join(__dirname, "../preload/index.js"),
      sandbox: false,
      nodeIntegration: true,
      contextIsolation: false
      // Note: Turning off context isolation is a security risk
    }
  });
  if (electron.app.dock) {
    electron.app.dock.setIcon(icon);
  }
  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });
  mainWindow.webContents.setWindowOpenHandler((details) => {
    electron.shell.openExternal(details.url);
    return { action: "deny" };
  });
  mainWindow.webContents.openDevTools();
  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow.webContents.send("set-dirname", __dirname);
  });
  if (utils.is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(path$1.join(__dirname, "../renderer/index.html"));
  }
}
electron.app.whenReady().then(() => {
  utils.electronApp.setAppUserModelId("com.electron");
  electron.app.on("browser-window-created", (_, window) => {
    utils.optimizer.watchWindowShortcuts(window);
  });
  createWindow();
  autoUpdater.checkForUpdatesAndNotify();
  electron.app.on("activate", function() {
    if (electron.BrowserWindow.getAllWindows().length === 0)
      createWindow();
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
autoUpdater.on("update-available", () => {
  mainWindow.webContents.send("update_available");
  console.log("update available");
});
autoUpdater.on("update-downloaded", () => {
  mainWindow.webContents.send("update_downloaded");
  console.log("update downloaded");
});
electron.ipcMain.on("restart_app", () => {
  autoUpdater.quitAndInstall();
});
electron.ipcMain.on("start-verifyLoginDetails-task", async (event, arg) => {
  console.log(arg);
  const username = arg.username;
  const password = arg.password;
  try {
    const login = await primulaFunction.login(username, password);
    console.log(login);
    if (login === 200) {
      console.log("Login successful");
      event.sender.send("verifyLoginDetails-task-complete", {
        status: "success",
        username,
        password
      });
    } else {
      console.log("Login failed");
      event.sender.send("verifyLoginDetails-task-complete", {
        status: "failed",
        username,
        password
      });
    }
  } catch (error) {
    console.log(error);
    event.sender.send("verifyLoginDetails-task-complete", { status: error });
  }
});
let globalPageContext = null;
electron.ipcMain.on("start-fetchSchedule-task", async (event, arg) => {
  try {
    console.log(arg);
    const month = arg.month;
    const name = arg.name;
    const salary = arg.salary;
    const data = await fetchSchedule.formatKronoxData(month, name, salary);
    console.log(data);
    const kronoxData = await fetchSchedule.getKronoxData(data);
    console.log(kronoxData);
    event.sender.send("fetchSchedule-task-complete", kronoxData);
  } catch (error) {
    console.log(error);
  }
});
electron.ipcMain.on("start-formSubmit-task", async (event, arg) => {
  console.log(arg);
  const username = arg.username;
  const password = arg.password;
  arg.month;
  arg.salary;
  arg.data;
  console.log("arg 89: ", arg);
  const newPage = await primulaFunction.loginToMain(username, password);
  globalPageContext = newPage;
  await primulaFunction.loginToPrimula(newPage, username, password);
  const checkMFA = await primulaFunction.checkMFA(newPage);
  console.log(checkMFA);
  if (checkMFA === true) {
    const mfaCode = await primulaFunction.getMFA(newPage);
    mainWindow.webContents.send("MFA", mfaCode);
  }
  await primulaFunction.primulaNavigate(newPage);
  await mainWindow.webContents.send("MFAdone", "done");
  const checkEmployment = await primulaFunction.checkEmployment(newPage);
  console.log("CheckEmployment:", checkEmployment);
  if (checkEmployment === true) {
    const getOptions = await primulaFunction.getEmployment(newPage);
    console.log("getOptions: ", getOptions);
    mainWindow.webContents.send("EMP", getOptions);
  }
});
electron.ipcMain.on("EMP_data", async (event, clientData) => {
  console.log("clientData: ", clientData);
  const selected_option = clientData.empValue;
  const month = clientData.month;
  const salary = clientData.salary;
  const data = clientData.data;
  const newPage = globalPageContext;
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  console.log("newPage: ", newPage);
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
    const advancedtableData = logicData.advancedtableData;
    const validFormDataTEST = await primulaFunction.VerifyData(
      data,
      advancedtableData
    );
    console.log("validFormDataTEST: ", validFormDataTEST);
    if (validFormDataTEST) {
      console.log("success");
      mainWindow.webContents.send("Results", advancedtableData[0]);
    }
  } catch (error) {
    console.log(error);
  }
  try {
    await primulaFunction.removeArende(newPage);
  } catch (error) {
    console.log(error);
  }
  event.sender.send("formSubmit-task-complete", "success");
});
