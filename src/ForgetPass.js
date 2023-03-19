//importlar ve değişkenler
const electron = require('electron');
const { ipcRenderer } = electron;
const firebase = require("firebase/app");
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,sendPasswordResetEmail
} = require("firebase/auth");
let emailTxt = document.getElementById("emailTextfrg");
let Sendbtn = document.getElementById("SignUpButtonsgn");
let Goback = document.getElementById("back");
let github = document.querySelector("#githubLogo");
const firebaseConfig = {
  apiKey: "AIzaSyBVN4_YiQDOoMpM459WHOz3X0_ZKe8F1Jk",
  authDomain: "aerofrcscouting-3bcdf.firebaseapp.com",
  databaseURL: "https://aerofrcscouting-3bcdf-default-rtdb.firebaseio.com",
  projectId: "aerofrcscouting-3bcdf",
  storageBucket: "aerofrcscouting-3bcdf.appspot.com",
  messagingSenderId: "602590939463",
  appId: "1:602590939463:web:bca741b1981e139c1da462",
  measurementId: "G-X6RTRCJH1B",
};
const app = firebase.initializeApp(firebaseConfig);

function sendEmail() {
    return new Promise((resolve, reject) => {
      const auth = getAuth();
      const emailData = emailTxt.value;
      sendPasswordResetEmail(auth, emailData)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

//eventler
Goback.addEventListener("click", function () {
  //main.js'e geri login ekranına geri gönder mesajı verme
  ipcRenderer.send("goBackForgetPass");
});


//eventler
Sendbtn.addEventListener("click", function () {
  sendEmail()
      .then(() => {
        ipcRenderer.send("ShowInfoMessagebox", {
          title: "Reset Password",
          message: "We sent reset link to your email please check your email.",
        });
        ipcRenderer.send("goBackForgetPass");
      })
      .catch((error) => {
        ipcRenderer.send("ShowErrorMessagebox", {
          title: "Error",
          message: error,
        });
      });
  });

  emailTxt.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    sendEmail()
    .then(() => {
      ipcRenderer.send("ShowInfoMessagebox", {
        title: "Reset Password",
        message: "We sent reset link to your email please check your email.",
      });
      ipcRenderer.send("goBackForgetPass");
    })
    .catch((error) => {
      ipcRenderer.send("ShowErrorMessagebox", {
        title: "Error",
        message: error,
      });
    });
  }
  });

  github.addEventListener("click", () => {
    //github logosuna basınca githuba yönlendirme
    electron.shell.openExternal("https://github.com/AeroRoboticTeams");
  });
