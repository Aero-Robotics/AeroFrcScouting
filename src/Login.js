//importlar ve değişkenler
const electron = require('electron');
const { ipcRenderer } = electron;
const firebase = require("firebase/app");
const {
  getAuth,
  signInWithEmailAndPassword,
} = require("firebase/auth");
let github = document.querySelector("#githubLogo");
const loginButton = document.getElementById("loginButton");
const signupButton = document.getElementById("lblSignUp");
const email = document.getElementById("emailText");
const password = document.getElementById("passwordText");
const ForgetPassButton = document.getElementById("lblForgetPassword");
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

//fonksiyonlar
function Login() {
  var EmailValue = email.value;
  var passwordValue = password.value;
  //eğer şifre 6 haneden küçükse ekrana yazı gösterme
  if (passwordValue.length < 8) {
    ipcRenderer.send("ShowWarningMessagebox", {
      title: "short password",
      message: " password must be bigger than 8 digits",
    });
  } else {
    //eğer değilse giriş yapma
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, EmailValue, passwordValue)
      .then((userCredential) => {
        ipcRenderer.send("SignIn",{Email:EmailValue,Password:passwordValue});      
      })
      .catch((error) => {
        //şifre yanlışsa hatayı consola ekrana mesaj gösterme
        console.log(error);
        ipcRenderer.send("ShowWarningMessagebox", {
          title: "wrong password",
          message: "The password you entered is incorrect",
        });
      });
  }
}

//eventler
loginButton.addEventListener("click", function () {
  Login();
});

password.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    Login();
  }
});

github.addEventListener("click", () => {
  //github logosuna basınca githuba yönlendirme
  electron.shell.openExternal("https://github.com/AeroRoboticTeams");
});

signupButton.addEventListener("click", function () {
  //sign up ekranına yönlendirme
  ipcRenderer.send("SignUp");
});

ForgetPassButton.addEventListener("click", function () {
  //şifre sıfırlama ekranına yönlendirme
  ipcRenderer.send("Forgetpass");
});

