//importlar ve değişkenler
const electron = require('electron');
const { ipcRenderer } = electron;
const firebase = require("firebase/app");
const { getAuth,signInWithEmailAndPassword, onAuthStateChanged } = require("firebase/auth");
let logOutButton = document.getElementById("LogoutButton");
let AccountButton = document.getElementById("AccountButton");
let addButton = document.getElementById("AddButton");
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

logOutButton.addEventListener("click",function(){
  ipcRenderer.send("Logout");
});

AccountButton.addEventListener("click",function(){
ipcRenderer.send("AccountClick");
});

addButton.addEventListener("click",function(){
  ipcRenderer.send("addMatch");
});
