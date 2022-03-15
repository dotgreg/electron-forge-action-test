const { app, BrowserWindow } = require('electron')
const homedir = require('os').homedir();
const logFile = `${homedir}/log-electron-test.html` 
const archi = process.arch

const getRgPath = () => {
		const appRootDir = require('app-root-dir').get();
		const binPath = appRootDir + '/bin/rg.jpeg';
		console.log({binPath});
		return binPath
}

const createWindow = () => {
		const win = new BrowserWindow({
				width: 800,
				height: 600
		})

		win.loadFile(logFile)
}

const { exec } = require('child_process');
app.whenReady().then(() => {
		cleanLog();  
		logWrite(`==== NEW APP START (${archi})===`);  
		rgBinTest();
		setTimeout( () => {
				createWindow();
		},1000)
})

const fs = require('fs')
const cleanLog = () => {
		fs.writeFile(logFile, '', err => {})
}
const logWrite = (content) => {
		content = `${new Date().getTime()} => ${content} <br/>`
		fs.appendFile(logFile, content, err => {})
}

const execCmdLog = (cmd, params) => {
		const spawn = require( 'child_process' ).spawn;
		try {
				const child = spawn( cmd, params);  
				child.stdout.on( 'data', data => {
						data = `${data}`.substring(1,400);
						const str = `[${cmd}] : ${data}`;
						console.log( str );
						logWrite(str);  
				});
				child.stderr.on( 'data', data => {
						data = `${data}`.substring(1,400);
						const str = `[${cmd} ERROR!] : ${data}`;
						console.log( str );
						logWrite(str);  
				});
		} catch (e) {
				logWrite(`[${cmd} ERROR JS!] : ${e}`);
		}
}

const rgBinTest = () => {
		const binPath = getRgPath();
		logWrite(`binpath : ${binPath}`);
		//const child = spawn( binPath, ['woop', `/Users/gregoirethiebault/Desktop/_dev/data-test`]);  //add whatever switches you need here, test on command line first
		//execCmdLog(binPath, ['woop', `/Users/gregoirethiebault/Desktop/_dev/data-test`]);
		//execCmdLog('pwd', []);
		//execCmdLog(binPath, ['woop', `/Users/gregoirethiebault/Desktop/_dev/data-test`]);
		execCmdLog('pwd', []);
		execCmdLog(binPath, ['woop', `${homedir}/Desktop/data-test`]);
		//execCmdLog('ls', ['*']);
};
