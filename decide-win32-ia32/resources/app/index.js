const electron = require('electron');

const app = electron.app;
const browser = electron.BrowserWindow;
let myWindow = null;

app.on('ready', () => {
    myWindow = new browser({
        width: 600,
        height: 250,
        webPreferences: { nodeIntegration: true }
    });
    myWindow.loadFile('./src/index.html');

    myWindow.on('closed', () => myWindow = null);
})


/* */


