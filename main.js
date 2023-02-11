const electron = require('electron');
const { app, BrowserWindow, Menu, ipcMain, nativeTheme, dialog } = electron;
let mainWindow;

app.on('ready', () => {
    mainWindow = new electron.BrowserWindow({
        webPreferences: {
            zoomFactor: 1.0,
            nodeIntegration: true,
            contextIsolation: false,
        },
        width: 1060,
        height: 730,
        backgroundColor: '#0B0911',
       // frame: false ,
        resizable: false,
        /*titleBarStyle: 'hidden',
        titleBarOverlay: {
            color: '#2f3241',
            symbolColor: '#74b1be'
        },*/
        maximizable: false,
    });

    mainWindow.loadFile('.\\src\\index.html')

    ipcMain.on('btn', (err, data) => {
      console.warn("deneme");
  });
});