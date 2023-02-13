const electron = require('electron');
const { app, BrowserWindow, Menu, ipcMain, nativeTheme, dialog } = electron;
let Home;

app.on('ready', () => {
    Home = new electron.BrowserWindow({
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

    Home.loadFile('.\\src\\home.html');

    ipcMain.on("SignIn", (err) => {
        let signIn = new electron.BrowserWindow({
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
        signIn.loadFile('.\\src\\home.html');
        Home.close();
    });
    
    ipcMain.on("WrongPass", (err) => {
        dialog.showMessageBox({
            type: 'warning',
            title: 'Warning',
            message: 'wrong password or email adress. Please check and try again.'
        });
    });
});