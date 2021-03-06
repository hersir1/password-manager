const { app, BrowserWindow } = require('electron');
const { exec } = require('child_process');
const fs = require('fs');
const axios = require('axios');

const serverPath = `${process.cwd()}/resources/server/dist`;

const startServer = () => {
	let serverStartResult = exec(`node main`, { cwd: serverPath });
	
	serverStartResult.stderr.on('data', data => {
		fs.writeFileSync('startServerError.log', data);
	});
	
	serverStartResult.stdout.on('data', data => {
		fs.writeFileSync('startServerOut.log', data);
	});
};

const stopServer = async () => {
	await axios.get('http://localhost:3000/shutdown');
};

function createWindow () {
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		icon: './dist/password-manager/assets/logo.ico',
		autoHideMenuBar: true,
		darkTheme: true
	})

	/*mainWindow.webContents.openDevTools();*/

	mainWindow.maximize();
	mainWindow.loadFile('./dist/password-manager/index.html')
}

app.whenReady().then(() => {
	createWindow();
	startServer();
	
	app.on('activate', function () {
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	});
});

app.on('window-all-closed', function () {
	stopServer().then(() => {
		if (process.platform !== 'darwin') app.quit();
	});
});