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

const execCmdLog = (cmd, params) => {
		const spawn = require( 'child_process' ).spawn;
		try {
				const child = spawn( cmd, params);  
				child.stdout.on( 'data', data => {
						data = `${data}`.substring(1,400);
						const str = `[${cmd}] ${new Date().getTime()}: ${data}`;
						console.log( str );
						logWrite(str);  
				});
				child.stderr.on( 'data', data => {
						data = `${data}`.substring(1,400);
						const str = `[${cmd} ERROR!] ${new Date().getTime()}: ${data}`;
						console.log( str );
						logWrite(str);  
				});
		} catch (e) {
				logWrite(`[${cmd} ERROR JS!] ${new Date().getTime()} : ${e}`);
		}
}

const rgBinTest = () => {
		const appRootDir = require('app-root-dir').get();
		const binPath = appRootDir + '/bin/rg';
		console.log({binPath});
		//const child = spawn( binPath, ['woop', `/Users/gregoirethiebault/Desktop/_dev/data-test`]);  //add whatever switches you need here, test on command line first
		//execCmdLog(binPath, ['woop', `/Users/gregoirethiebault/Desktop/_dev/data-test`]);
		execCmdLog('pwd', []);
		//execCmdLog(binPath, ['woop', `/Users/gregoirethiebault/Desktop/_dev/data-test`]);
		execCmdLog(binPath, ['woop', `~/test-data-folder`]);
		//execCmdLog('ls', ['*']);
};
