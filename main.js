const { app, BrowserWindow } = require('electron');
const path = require('path');
const { exec } = require('child_process');
const fs = require('fs');

const serverPath = `${process.cwd()}/server/dist`;

startServer = () => {
	let serverStartResult = exec(`node main`, { cwd: serverPath });
	
	serverStartResult.stderr.on('data', data => {
		fs.writeFileSync('startServerError.log', data);
	});
	
	serverStartResult.stdout.on('data', data => {
		fs.writeFileSync('startServerOut.log', data);
	});
};

stopServer = () => {

};

function createWindow () {
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600
	})
	
	mainWindow.maximize();
	mainWindow.loadFile('./dist/password-manager/index.html')
}

app.whenReady().then(() => {
	createWindow();
	startServer();
	
	app.on('activate', function () {
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	});
})

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') app.quit();
})
