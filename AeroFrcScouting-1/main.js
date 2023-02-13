const { ipcRenderer } = require('electron');
const electron = require('electron');
const { app, BrowserWindow, Menu, ipcMain, nativeTheme, dialog, globalShortcut } = electron;
let Home;

app.on('ready', () => {

    Home = new electron.BrowserWindow({
        title: 'Aero Frc Scouting',
        webPreferences: {
            zoomFactor: 1.0,
            nodeIntegration: true,
            contextIsolation: false,
        },
        width: 1060,
        height: 730,
        backgroundColor: '#0B0911',
        //frame: false ,
        resizable: false,
        /* titleBarStyle: 'hidden',
         titleBarOverlay: {
             color: '#2f3241',
             symbolColor: '#74b1be'
         },*/
        maximizable: false,
    });

    Home.loadFile('.\\src\\home.html');

    ipcMain.on("SignUp", (err) => {
        let SignUp = new BrowserWindow({
            width: 1060,
            height: 730,
            backgroundColor: '#0B0911',
            resizable: false,
            maximizable: false,
            title: 'Aero Frc Scouting',
        });

        SignUp.loadFile('.\\src\\SgnUp.html');
        ipcMain.send('sgnpage');

        SignUp.on('close', () => {
            SignUp = null;
        })
        Home.close();
    });

    ipcMain.on("shortpassword", (err) => {
        dialog.showMessageBox({
            type: 'warning',
            title: 'Warning',
            message: 'Your password cannot be shorter than 6 characters !'
        });


        ipcMain.on("WrongPass", (err) => {
            dialog.showMessageBox({
                type: 'Error',
                title: 'Warning',
                message: 'Wrong password or email adress. Please check and try again.'
            });
        });
    });
});
