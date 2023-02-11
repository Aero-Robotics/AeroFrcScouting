const electron = require('electron');
const { ipcRenderer } = electron;
let github = document.querySelector("#githubLogo");
let loginbutton = document.querySelector("#loginButton");
loginbutton.addEventListener('click', () => {
  ipcRenderer.send('btn');
});

github.addEventListener('click', () => {
  electron.shell.openExternal('https://github.com/AeroRoboticTeams')

  
});
