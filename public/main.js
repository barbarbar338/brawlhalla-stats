const { app, BrowserWindow, Tray, Notification, Menu } = require("electron");

if (require("electron-squirrel-startup")) app.quit();

const path = require("path");
const isDev = require("electron-is-dev");
const AutoLaunch = require("auto-launch");

require("@electron/remote/main").initialize();

const autoStart = new AutoLaunch({
	name: "Brawlhalla Stats",
});
autoStart.enable();

const icon = path.join(__dirname, "/favicon.ico");
let tray = null;
let isQuiting = false;
let mainWindow = null;
let popupWindow = null;

function createTray() {
	tray = new Tray(icon);
	tray.setToolTip("Brawlhalla Stats");
	tray.setContextMenu(
		Menu.buildFromTemplate([
			{
				label: "Show App",
				click: () => {
					if (!mainWindow.isVisible()) mainWindow.show();
				},
			},
			{
				label: "Quit",
				click: () => {
					isQuiting = true;
					app.quit();
				},
			},
		]),
	);
}

function createPopupWindow() {
	popupWindow = new BrowserWindow({
		width: 260,
		height: 360,
		x: 0,
		y: 0,
		resizable: false,
		alwaysOnTop: true,
		webPreferences: {
			nodeIntegration: true,
			enableRemoteModule: true,
			devTools: isDev,
			contextIsolation: false,
		},
		frame: false,
		icon,
		title: "Brawlhalla Stats",
	});
	popupWindow.loadURL(
		isDev
			? "http://localhost:3000/#/popup"
			: `file://${path.join(__dirname, "../build/index.html#popup")}`,
	);
	popupWindow.hide();
	popupWindow.on("close", (e) => {
		if (!isQuiting) {
			e.preventDefault();
			popupWindow.hide();
		}
	});
	popupWindow.on("blur", () => {
		popupWindow.hide();
	});
	tray.on("click", (event, bounds) => {
		popupWindow.setPosition(
			bounds.x - popupWindow.getSize()[0],
			bounds.y - popupWindow.getSize()[1],
			false,
		);
		if (popupWindow.isVisible()) popupWindow.hide();
		else popupWindow.show();
	});
}

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			enableRemoteModule: true,
			devTools: isDev,
			contextIsolation: false,
		},
		frame: false,
		icon,
		title: "Brawlhalla Stats",
	});
	mainWindow.loadURL(
		isDev
			? "http://localhost:3000"
			: `file://${path.join(__dirname, "../build/index.html")}`,
	);
	mainWindow.on("close", (e) => {
		if (!isQuiting) {
			e.preventDefault();
			mainWindow.hide();
		}
	});
}

app.on("ready", () => {
	createWindow();
	createTray();
	createPopupWindow();
	showNotification(
		"Brawlhalla Stats running on background! See application tray.",
	);
});

app.on("window-all-closed", function () {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", function () {
	if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

function showNotification(body) {
	const notification = new Notification({
		title: "Brawlhalla Stats",
		body,
		silent: true,
		timeoutType: "default",
	});
	notification.show();
	setTimeout(() => {
		notification.close();
	}, 5000);
}
