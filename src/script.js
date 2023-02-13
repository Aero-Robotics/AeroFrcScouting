const { ipcRenderer } = require('electron');
const firebase = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth');
let github = document.querySelector("#githubLogo");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBVN4_YiQDOoMpM459WHOz3X0_ZKe8F1Jk",
    authDomain: "aerofrcscouting-3bcdf.firebaseapp.com",
    databaseURL: "https://aerofrcscouting-3bcdf-default-rtdb.firebaseio.com",
    projectId: "aerofrcscouting-3bcdf",
    storageBucket: "aerofrcscouting-3bcdf.appspot.com",
    messagingSenderId: "602590939463",
    appId: "1:602590939463:web:bca741b1981e139c1da462",
    measurementId: "G-X6RTRCJH1B"
  };
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const loginButton = document.getElementById("loginButton");
const signupButton = document.getElementById("lblSignUp");

signupButton.addEventListener("click",function(){
    var EmailValue = document.getElementById('emailText').value;
    var passwordValue = document.getElementById('passwordText').value;
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, EmailValue, passwordValue)
  .then((userCredential) => {
    alert("kayıt edildi");
  })
  .catch((error) => {
    console.log(error);
  });
});

loginButton.addEventListener("click",function(){
    var EmailValue = document.getElementById('emailText').value;
    var passwordValue = document.getElementById('passwordText').value;
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, EmailValue, passwordValue)
  .then((userCredential) => {
    ipcRenderer.send("SignIn");
  })
  .catch((error) => {
    console.log(error);
    ipcRenderer.send("WrongPass");
  });
});

github.addEventListener('click', () => {
  electron.shell.openExternal('https://github.com/AeroRoboticTeams')
});