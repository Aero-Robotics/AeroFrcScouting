const electron = require('electron');
const { ipcMain, ipcRenderer } = require('electron')
const { app, BrowserWindow, dialog} = electron;
const { remote } = require('electron');
let Login;
let SignUp;
let Forgetpass;
let MainPage;
let addMatchPage;
let addMatchPage2;
var Email;
var Password;
var fristallience=[];
var Secondallience=[];

app.on('ready', () => {

    Login = new electron.BrowserWindow({
        title: 'Aero Frc Scouting',
        webPreferences: {
            zoomFactor: 1.0,
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
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
    });;

    Login.loadFile('./src/public/views/Login.html');

    ipcMain.on("goBackSign", () => {
        SignUp.close();

         Login = new electron.BrowserWindow({
            title: 'Aero Frc Scouting',
            webPreferences: {
                zoomFactor: 1.0,
                nodeIntegration: true,
                contextIsolation: false,
                enableRemoteModule: true
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
        Login.loadFile('./src/public/views/Login.html');
    })

    ipcMain.on("goBackForgetPass", () => {
        Forgetpass.close();

         Login = new electron.BrowserWindow({
            title: 'Aero Frc Scouting',
            webPreferences: {
                zoomFactor: 1.0,
                nodeIntegration: true,
                contextIsolation: false,
                enableRemoteModule: true
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
        Login.loadFile('');
    })


    ipcMain.on("goBackAddMatch", () => {
        addMatchPage.close();

         MainPage = new electron.BrowserWindow({
            title: 'Aero Frc Scouting',
            webPreferences: {
                zoomFactor: 1.0,
                nodeIntegration: true,
                contextIsolation: false,
                enableRemoteModule: true
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
        MainPage.loadFile('./src/public/views/MainPage.html');
    })

    ipcMain.on("nextAddMatch", (err,data) =>{

         addMatchPage2 = new electron.BrowserWindow({
            title: 'Aero Frc Scouting',
            webPreferences: {
                zoomFactor: 1.0,
                nodeIntegration: true,
                contextIsolation: false,
                enableRemoteModule: true
            },
            backgroundColor: '#0B0911',
            //frame: false ,
            /* titleBarStyle: 'hidden',
             titleBarOverlay: {
                 color: '#2f3241',
                 symbolColor: '#74b1be'
             },*/
        });
        fristallience = data.frist;
        Secondallience = data.second;
        addMatchPage2.maximize(true);
        addMatchPage.close();
        addMatchPage2.loadFile('./src/public/views/addMatch2.html');
    })

    ipcMain.on("Forgetpass", () => {
        Forgetpass = new electron.BrowserWindow({
            title: 'Aero Frc Scouting',
            webPreferences: {
                zoomFactor: 1.0,
                nodeIntegration: true,
                contextIsolation: false,
                enableRemoteModule: true
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
        Login.close();
        Forgetpass.loadFile('./src/public/views/ForgetPassword.html');
    })

    ipcMain.on("SignUp", (err) => {
        SignUp = new electron.BrowserWindow({
            webPreferences: {
                zoomFactor: 1.0,
                nodeIntegration: true,
                contextIsolation: false,
                nodeIntegrationInWorker: true,
                enableRemoteModule: true
            },
            width: 1060,
            height: 730,
            backgroundColor: '#0B0911',
            resizable: false,
            maximizable: false,
            title: 'Aero Frc Scouting',
        });

        SignUp.loadFile('./src/public/views/SignUp.html');
        Login.close();
    });

    ipcMain.on("SignIn", (err,data) => {
        MainPage = new electron.BrowserWindow({
            webPreferences: {
                zoomFactor: 1.0,
                nodeIntegration: true,
                contextIsolation: false,
                nodeIntegrationInWorker: true,
                enableRemoteModule: true,
            },
            width: 1060,
            height: 730,
            backgroundColor: '#0B0911',
            resizable: false,
            maximizable: false,
            title: 'Aero Frc Scouting',
        });

        Email = data.Email;
       Password = data.Password;
    
        MainPage.loadFile('./src/public/views/MainPage.html');
        Login.close();

    });


    ipcMain.on('getalliences', (event, arg) => {
        event.reply('send-data', {frist:fristallience,second:Secondallience});
      });

    ipcMain.on('get-data', (event, arg) => {
        const User={Email,Password};
        event.reply('send-data', User);
      });

      ipcMain.on('GobackAccount', () => {
         MainPage = new electron.BrowserWindow({
            title: 'Aero Frc Scouting',
            webPreferences: {
                zoomFactor: 1.0,
                nodeIntegration: true,
                contextIsolation: false,
                enableRemoteModule: true
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
        MainPage.loadFile('./src/public/views/MainPage.html');
        ManageUser.close();
      })

      ipcMain.on('quitAccount', () => {
        ManageUser.close();

         Login = new electron.BrowserWindow({
            title: 'Aero Frc Scouting',
            webPreferences: {
                zoomFactor: 1.0,
                nodeIntegration: true,
                contextIsolation: false,
                enableRemoteModule: true
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
        Login.loadFile('./src/public/views/Login.html');
      })

    ipcMain.on("AccountClick", () => {
        MainPage.close();
        
         ManageUser = new electron.BrowserWindow({
            title: 'Aero Frc Scouting',
            webPreferences: {
                zoomFactor: 1.0,
                nodeIntegration: true,
                contextIsolation: false,
                enableRemoteModule: true,
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

        ManageUser.loadFile('./src/public/views/ManageUser.html');
        MainPage.close();
    })

    ipcMain.on("addMatch", () => {
        MainPage.close();
        
        addMatchPage = new electron.BrowserWindow({
            title: 'Aero Frc Scouting',
            webPreferences: {
                zoomFactor: 1.0,
                nodeIntegration: true,
                contextIsolation: false,
                enableRemoteModule: true,
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

        addMatchPage.loadFile('./src/public/views/addMatch.html');
        MainPage.close();
    })


//Logout'a tıklandığında Login ekranına geri yönlendirme
ipcMain.on("Logout", (err,data) => {
    const options = {
        type: 'question',
        buttons: ['Yes', 'No'],
        title: 'Confirmation',
        message: 'Are you sure you want to quit?'
    }
    
    const response = dialog.showMessageBoxSync(null, options);
    if (response === 0) {
        MainPage.close();
        Login = new electron.BrowserWindow({
            title: 'Aero Frc Scouting',
            webPreferences: {
                zoomFactor: 1.0,
                nodeIntegration: true,
                contextIsolation: false,
                enableRemoteModule: true
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
        });;
        
        Login.loadFile('./src/public/views/Login.html');
    }
});


    //mesage boxları okuma
    ipcMain.on("ShowWarningMessagebox", (err,data) => {
        dialog.showMessageBox({
            type: 'warning',
            title: data.title,
            message: data.message
        })
    })

    ipcMain.on("ShowErrorMessagebox", (err,data) => {
        dialog.showMessageBox({
            type: 'error',
            title: data.title,
            message: data.message
        })
    })

    ipcMain.on("ShowInfoMessagebox", (err,data) => {
        dialog.showMessageBox({
            type: 'info',
            title: data.title,
            message: data.message
        })
    })
});
