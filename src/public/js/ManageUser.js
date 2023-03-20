const { ipcMain, ipcRenderer } = require("electron");
const firebase = require("firebase/app");
const {
  app,
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateEmail,
  updatePassword,
  deleteUser,
} = require("firebase/auth");
const txtEmail = document.getElementById("emailTextMgn");
const txtPassword = document.getElementById("passwordTextMgn");
const txtconfirm = document.getElementById("ComfirmPassMgn");
const bacButton = document.getElementById("back");
const DeleteButton = document.getElementById("DeleteButton");
const UpdateButton = document.getElementById("UpdateButton");

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

firebase.initializeApp(firebaseConfig);

ipcRenderer.send("get-data");

ipcRenderer.on("send-data", (event, arg) => {
  const auth = getAuth(app);
  signInWithEmailAndPassword(auth, arg.Email, arg.Password)
    .then((userCredential) => {
      const user = auth.currentUser;
      if (user !== null) {
        const email = user.email;
        const uid = user.uid;
        txtEmail.value = email;
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

UpdateButton.addEventListener("click", function () {
  if (txtPassword === txtconfirm) {
    ipcRenderer.send("ShowWarningMessagebox", {
      title: "Account Update",
      message: "the passwords does not match",
    });
  } else {
    const auth = getAuth();
    updateEmail(auth.currentUser, txtEmail.value)
      .then(() => {
        const newPassword = txtPassword.value;
        const auth = getAuth();
        const user = auth.currentUser;
        updatePassword(user, newPassword)
          .then(() => {
            ipcRenderer.send("ShowWarningMessagebox", {
              title: "Account Update",
              message: "The account was updated Now you must Login again.",
            });
            ipcRenderer.send("quitAccount");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

DeleteButton.addEventListener("click", function () {
  const auth = getAuth();
  const user = auth.currentUser;

  deleteUser(user)
    .then(() => {
      ipcRenderer.send("ShowWarningMessagebox", {
        title: "Delete Account",
        message: "The account was delected",
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

bacButton.addEventListener("click",function(){
  ipcRenderer.send("GobackAccount");
})
