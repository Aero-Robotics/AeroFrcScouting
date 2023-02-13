const { ipcRenderer, ipcMain } = require('electron');
const firebase = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth');
let github = document.querySelector("#githubLogo");
const loginButton = document.getElementById("loginButton");
const signupButton = document.getElementById("lblSignUp");
const email = document.getElementById("emailText");
const password = document.getElementById("passwordText");
const emailsgn = document.getElementById("emailTextsgn");
const passwordsgn = document.getElementById("passwordTextsgn");
const confpasswordsgn = document.getElementById("ComfirmPasssgn");
const signupsgn = document.getElementById("SignUpButtonsgn");



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

const app = firebase.initializeApp(firebaseConfig);










loginButton.addEventListener("click", function () {
  var EmailValue = email.value;
  var passwordValue = password.value;
  if (passwordValue.length < 6) {
    ipcRenderer.send('shortpassword')
  }
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

signupButton.addEventListener("click", function () {
  ipcRenderer.send("SignUp");
});

ipcMain.on("sgnpage", (err) => {

  signup.addEventListener("click", function () {
    const auth = getAuth(app);
    var emailin = emailsgn.value;
    var passwordin = emailsgn.value;
    var passwordconfirm = confpasswordsgn.value;
    if (passwordin != passwordconfirm) {
      alert("passwords do not match");
      document.getElementById("passwordTextsgn").value = "";
      document.getElementById("ComfirmPasssgn").value = "";
    } else {
      createUserWithEmailAndPassword(auth, emailin, passwordin)
        .then((userCredential) => {
          alert("kayıt edildi");
        })
        .catch((error) => {
          console.log(error);
          warn(error);
        })
    }
  })
});