const { app, BrowserWindow } = require('electron')

const createWindow = () => {
		const win = new BrowserWindow({
				width: 800,
				height: 600
		})

		win.loadFile('bin/log.html')
}

const { exec } = require('child_process');
app.whenReady().then(() => {
		rgBinTest();
		setTimeout( () => {
				createWindow();
		},1000)
})

const fs = require('fs')
const logWrite = (content) => {
		const appRootDir = require('app-root-dir').get();
		const binLogPath = appRootDir + '/bin/log.html';
		fs.writeFile(binLogPath, content, err => {
				if (err) {
						console.error(err)
						return
				}
		})
}

const rgBinTest = () => {
		const appRootDir = require('app-root-dir').get();
		const binPath = appRootDir + '/bin/rgvscode';
		console.log({binPath});
		const spawn = require( 'child_process' ).spawn;
		const child = spawn( binPath, ['woop', `/Users/gregoirethiebault/Desktop/_dev/data-test`]);  //add whatever switches you need here, test on command line first
		child.stdout.on( 'data', data => {
				console.log( `stdout: ${data}` );
				logWrite(`${data}`);
		});
		child.stderr.on( 'data', data => {
				console.log( `stderr: ${data}` );
				logWrite(`${data}`);
		});
};
