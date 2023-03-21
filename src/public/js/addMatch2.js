const electron = require("electron");
const { ipcRenderer } = electron;
const firebase = require("firebase/app");
const { getDatabase, ref, set, child, get } = require("firebase/database");

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
const database = getDatabase(app);

var fristallience = [];
var Secondallience = [];

var team1Task = [];
var team2Task = [];
var team3Task = [];
var team4Task = [];
var team5Task = [];
var team6Task = [];

var FristAlliencePoints = 0;
var SecondAlliencePoints = 0;

var team1Point = 0;
var team2Point = 0;
var team3Point = 0;
var team4Point = 0;
var team5Point = 0;
var team6Point = 0;
var lastestTeam = 0;
const now = new Date();
const date = now.getDay() + "-" + now.getMonth() + 1 + "-" + now.getFullYear();

//takımların isismlerinin yazdığı labellar
const LblTeam1 = document.getElementById("lblTeam1");
const LblTeam2 = document.getElementById("lblTeam2");
const LblTeam3 = document.getElementById("lblTeam3");
const LblTeam4 = document.getElementById("lblTeam4");
const LblTeam5 = document.getElementById("lblTeam5");
const LblTeam6 = document.getElementById("lblTeam6");
//OTO kısmınının idleri
const move1 = document.getElementById("move1");
const move2 = document.getElementById("move2");
const move3 = document.getElementById("move3");
const move4 = document.getElementById("move4");
const move5 = document.getElementById("move5");
const move6 = document.getElementById("move6");
const lower1 = document.getElementById("lower1");
const lower2 = document.getElementById("lower2");
const lower3 = document.getElementById("lower3");
const lower4 = document.getElementById("lower4");
const lower5 = document.getElementById("lower5");
const lower6 = document.getElementById("lower6");
const middle1 = document.getElementById("middle1");
const middle2 = document.getElementById("middle2");
const middle3 = document.getElementById("middle3");
const middle4 = document.getElementById("middle4");
const middle5 = document.getElementById("middle5");
const middle6 = document.getElementById("middle6");
const top1 = document.getElementById("top1");
const top2 = document.getElementById("top2");
const top3 = document.getElementById("top3");
const top4 = document.getElementById("top4");
const top5 = document.getElementById("top5");
const top6 = document.getElementById("top6");
const placed1 = document.getElementById("placed1");
const placed2 = document.getElementById("placed2");
const placed3 = document.getElementById("placed3");
const placed4 = document.getElementById("placed4");
const placed5 = document.getElementById("placed5");
const placed6 = document.getElementById("placed6");
const notPlaced1 = document.getElementById("notPlaced1");
const notPlaced2 = document.getElementById("notPlaced2");
const notPlaced3 = document.getElementById("notPlaced3");
const notPlaced4 = document.getElementById("notPlaced4");
const notPlaced5 = document.getElementById("notPlaced5");
const notPlaced6 = document.getElementById("notPlaced6");

//teleop kımının idleri
const lower1Teleop = document.getElementById("lower1Teleop");
const lower2Teleop = document.getElementById("lower2Teleop");
const lower3Teleop = document.getElementById("lower3Teleop");
const lower4Teleop = document.getElementById("lower4Teleop");
const lower5Teleop = document.getElementById("lower5Teleop");
const lower6Teleop = document.getElementById("lower6Teleop");
const middle1Teleop = document.getElementById("middle1Teleop");
const middle2Teleop = document.getElementById("middle2Teleop");
const middle3Teleop = document.getElementById("middle3Teleop");
const middle4Teleop = document.getElementById("middle4Teleop");
const middle5Teleop = document.getElementById("middle5Teleop");
const middle6Teleop = document.getElementById("middle6Teleop");
const park1 = document.getElementById("park1");
const park2 = document.getElementById("park2");
const park3 = document.getElementById("park3");
const park4 = document.getElementById("park4");
const park5 = document.getElementById("park5");
const park6 = document.getElementById("park6");
const conection1 = document.getElementById("conection1");
const conection2 = document.getElementById("conection2");
const conection3 = document.getElementById("conection3");
const conection4 = document.getElementById("conection4");
const conection5 = document.getElementById("conection5");
const conection6 = document.getElementById("conection6");
const placed1Teleop = document.getElementById("placed1Teleop");
const placed2Teleop = document.getElementById("placed2Teleop");
const placed3Teleop = document.getElementById("placed3Teleop");
const placed4Teleop = document.getElementById("placed4Teleop");
const placed5Teleop = document.getElementById("placed5Teleop");
const placed6Teleop = document.getElementById("placed6Teleop");
const notPlaced1Teleop = document.getElementById("notPlaced1Teleop");
const notPlaced2Teleop = document.getElementById("notPlaced2Teleop");
const notPlaced3Teleop = document.getElementById("notPlaced3Teleop");
const notPlaced4Teleop = document.getElementById("notPlaced4Teleop");
const notPlaced5Teleop = document.getElementById("notPlaced5Teleop");
const notPlaced6Teleop = document.getElementById("notPlaced6Teleop");
const top1teleop = document.getElementById("top1teleop");
const top2teleop = document.getElementById("top2teleop");
const top3teleop = document.getElementById("top3teleop");
const top4teleop = document.getElementById("top4teleop");
const top5teleop = document.getElementById("top5teleop");
const top6teleop = document.getElementById("top6teleop");

//nitelik puanlarının idleri
const sustainability1 = document.getElementById("sustainability1");
const sustainability2 = document.getElementById("sustainability2");
const sustainability3 = document.getElementById("sustainability3");
const sustainability4 = document.getElementById("sustainability4");
const sustainability5 = document.getElementById("sustainability5");
const sustainability6 = document.getElementById("sustainability6");

//star
const star1 = document.getElementById("star1");
const star2 = document.getElementById("star2");
const star3 = document.getElementById("star3");
const star4 = document.getElementById("star4");
const star5 = document.getElementById("star5");
const star6 = document.getElementById("star6");

//buttonlar
const GoBack = document.getElementById("gobackButton2");
const Nextbutton = document.getElementById("NextButton2");
const ClearButton = document.getElementById("ClearButton");
const revokeButton = document.getElementById("revokeButton");

//seçilen takımların isimlerini almaya yarıyan kod
ipcRenderer.send("getalliences");
ipcRenderer.on("send-data", (event, arg) => {
  fristallience = arg.frist;
  Secondallience = arg.second;
  LblTeam1.innerText = fristallience[0];
  LblTeam2.innerText = fristallience[1];
  LblTeam3.innerText = fristallience[2];
  LblTeam4.innerText = Secondallience[0];
  LblTeam5.innerText = Secondallience[1];
  LblTeam6.innerText = Secondallience[2];

  for (let i = 0; i < fristallience.length; i++) {
    fristallience[i] = fristallience[i].replace(/\./g, "%2E");
  }

  for (let i = 0; i < Secondallience.length; i++) {
    Secondallience[i] = Secondallience[i].replace(/\./g, "%2E");
  }
});

//takım isimlerinin üstüne gelince takımların puanların gözükmesini sağlayan fonksiyon
function showPoints() {
  LblTeam1.title = "point: " + team1Point;
  LblTeam2.title = "point: " + team2Point;
  LblTeam3.title = "point: " + team3Point;
  LblTeam4.title = "point: " + team4Point;
  LblTeam5.title = "point: " + team5Point;
  LblTeam6.title = "point: " + team6Point;
}

// hareket buttonların kodu
move1.addEventListener("click", () => {
  team1Task.push([["move"], [3]]);
  team1Point += 3;
  FristAlliencePoints += 3;
  lastestTeam = 1;
  showPoints();
});

move2.addEventListener("click", () => {
  team2Task.push([["move"], [3]]);
  team2Point += 3;
  FristAlliencePoints += 3;
  lastestTeam = 2;
  showPoints();
});

move3.addEventListener("click", () => {
  team3Task.push([["move"], [3]]);
  team3Point += 3;
  FristAlliencePoints += 3;
  lastestTeam = 3;
  showPoints();
});

move4.addEventListener("click", () => {
  team4Task.push([["move"], [3]]);
  team4Point += 3;
  SecondAlliencePoints += 3;
  lastestTeam = 4;
  showPoints();
});

move5.addEventListener("click", () => {
  team5Task.push([["move"], [3]]);
  team5Point += 3;
  SecondAlliencePoints += 3;
  lastestTeam = 5;
  showPoints();
});

move6.addEventListener("click", () => {
  team6Task.push([["move"], [3]]);
  team6Point += 3;
  SecondAlliencePoints += 3;
  lastestTeam = 6;
  showPoints();
});

// alt buttonlarının kodu
lower1.addEventListener("click", () => {
  team1Task.push([["lower"], [3]]);
  team1Point += 3;
  FristAlliencePoints += 3;
  lastestTeam = 1;
  showPoints();
});

lower2.addEventListener("click", () => {
  team2Task.push([["move"], [3]]);
  team2Point += 3;
  FristAlliencePoints += 3;
  lastestTeam = 2;
  showPoints();
});

lower3.addEventListener("click", () => {
  team3Task.push([["move"], [3]]);
  team3Point += 3;
  FristAlliencePoints += 3;
  lastestTeam = 3;
  showPoints();
});

lower4.addEventListener("click", () => {
  team4Task.push([["move"], [3]]);
  team4Point += 3;
  SecondAlliencePoints += 3;
  lastestTeam = 4;
  showPoints();
});

lower5.addEventListener("click", () => {
  team5Task.push([["move"], [3]]);
  team5Point += 3;
  SecondAlliencePoints += 3;
  lastestTeam = 5;
  showPoints();
});

lower6.addEventListener("click", () => {
  team6Task.push([["move"], [3]]);
  team6Point += 3;
  SecondAlliencePoints += 3;
  lastestTeam = 6;
  showPoints();
});

// üst buttonlarının kodu
top1.addEventListener("click", () => {
  team1Task.push([["top"], [6]]);
  team1Point += 6;
  FristAlliencePoints += 6;
  lastestTeam = 1;
  showPoints();
});

top2.addEventListener("click", () => {
  team2Task.push([["top"], [6]]);
  team2Point += 6;
  FristAlliencePoints += 6;
  lastestTeam = 2;
  showPoints();
});

top3.addEventListener("click", () => {
  team3Task.push([["top"], [6]]);
  team3Point += 6;
  FristAlliencePoints += 6;
  lastestTeam = 3;
  showPoints();
});

top4.addEventListener("click", () => {
  team4Task.push([["top"], [6]]);
  team4Point += 6;
  SecondAlliencePoints += 6;
  lastestTeam = 4;
  showPoints();
});

top5.addEventListener("click", () => {
  team5Task.push([["top"], [6]]);
  team5Point += 6;
  SecondAlliencePoints += 6;
  lastestTeam = 5;
  showPoints();
});

top6.addEventListener("click", () => {
  team6Task.push([["top"], [6]]);
  team6Point += 6;
  SecondAlliencePoints += 6;
  lastestTeam = 6;
  showPoints();
});

// orta buttonların kodu
middle1.addEventListener("click", () => {
  team1Task.push([["middile"], [4]]);
  team1Point += 4;
  FristAlliencePoints += 4;
  lastestTeam = 1;
  showPoints();
});

middle2.addEventListener("click", () => {
  team2Task.push([["middile"], [4]]);
  team2Point += 4;
  FristAlliencePoints += 4;
  lastestTeam = 2;
  showPoints();
});

middle3.addEventListener("click", () => {
  team3Task.push([["middile"], [4]]);
  team3Point += 4;
  FristAlliencePoints += 4;
  lastestTeam = 3;
  showPoints();
});

middle4.addEventListener("click", () => {
  team4Task.push([["middile"], [4]]);
  team4Point += 4;
  SecondAlliencePoints += 4;
  lastestTeam = 4;
  showPoints();
});

middle5.addEventListener("click", () => {
  team5Task.push([["middile"], [4]]);
  team5Point += 4;
  SecondAlliencePoints += 4;
  lastestTeam = 5;
  showPoints();
});

middle6.addEventListener("click", () => {
  team6Task.push([["middile"], [4]]);
  team6Point += 4;
  SecondAlliencePoints += 4;
  lastestTeam = 6;
  showPoints();
});

// nişanlı buttonların kodu
placed1.addEventListener("click", () => {
  team1Task.push([["placed"], [8]]);
  team1Point += 8;
  FristAlliencePoints += 8;
  lastestTeam = 1;
  showPoints();
});

placed2.addEventListener("click", () => {
  team2Task.push([["placed"], [8]]);
  team2Point += 8;
  FristAlliencePoints += 8;
  lastestTeam = 2;
  showPoints();
});

placed3.addEventListener("click", () => {
  team3Task.push([["placed"], [8]]);
  team3Point += 8;
  FristAlliencePoints += 8;
  lastestTeam = 3;
  showPoints();
});

placed4.addEventListener("click", () => {
  team4Task.push([["placed"], [8]]);
  team4Point += 8;
  SecondAlliencePoints += 8;
  lastestTeam = 4;
  showPoints();
});

placed5.addEventListener("click", () => {
  team5Task.push([["placed"], [8]]);
  team5Point += 8;
  SecondAlliencePoints += 8;
  lastestTeam = 5;
  showPoints();
});

placed6.addEventListener("click", () => {
  team6Task.push([["placed"], [8]]);
  team6Point += 8;
  SecondAlliencePoints += 8;
  lastestTeam = 6;
  showPoints();
});

// nişanlı değil buttonların kodu
notPlaced1.addEventListener("click", () => {
  team1Task.push([["notPlaced"], [12]]);
  team1Point += 12;
  FristAlliencePoints += 12;
  lastestTeam = 1;
  showPoints();
});

notPlaced2.addEventListener("click", () => {
  team2Task.push([["notPlaced"], [12]]);
  team2Point += 12;
  FristAlliencePoints += 12;
  lastestTeam = 2;
  showPoints();
});

notPlaced3.addEventListener("click", () => {
  team3Task.push([["notPlaced"], [12]]);
  team3Point += 12;
  FristAlliencePoints += 12;
  lastestTeam = 2;
  lastestTeam = 3;
  showPoints();
});

notPlaced4.addEventListener("click", () => {
  team4Task.push([["notPlaced"], [12]]);
  team4Point += 12;
  SecondAlliencePoints += 12;
  lastestTeam = 4;
  showPoints();
});

notPlaced5.addEventListener("click", () => {
  team5Task.push([["notPlaced"], [12]]);
  team5Point += 12;
  SecondAlliencePoints += 12;
  lastestTeam = 5;
  showPoints();
});

notPlaced6.addEventListener("click", () => {
  team6Task.push([["notPlaced"], [12]]);
  team6Point += 12;
  SecondAlliencePoints += 12;
  lastestTeam = 6;
  showPoints();
});

// teleop alt kodu
lower1Teleop.addEventListener("click", () => {
  team1Task.push([["LowerTeleop"], [2]]);
  team1Point += 2;
  FristAlliencePoints += 2;
  lastestTeam = 1;
  showPoints();
});

lower2Teleop.addEventListener("click", () => {
  team2Task.push([["LowerTeleop"], [2]]);
  team2Point += 2;
  FristAlliencePoints += 2;
  lastestTeam = 2;
  showPoints();
});

lower3Teleop.addEventListener("click", () => {
  team3Task.push([["LowerTeleop"], [2]]);
  team3Point += 2;
  FristAlliencePoints += 2;
  lastestTeam = 3;
  showPoints();
});

lower4Teleop.addEventListener("click", () => {
  team4Task.push([["LowerTeleop"], [2]]);
  team4Point += 2;
  SecondAlliencePoints += 2;
  lastestTeam = 4;
  showPoints();
});

lower5Teleop.addEventListener("click", () => {
  team5Task.push([["LowerTeleop"], [2]]);
  team5Point += 2;
  SecondAlliencePoints += 2;
  lastestTeam = 5;
  showPoints();
});

lower6Teleop.addEventListener("click", () => {
  team6Task.push([["LowerTeleop"], [2]]);
  team6Point += 2;
  SecondAlliencePoints += 2;
  lastestTeam = 6;
  showPoints();
});

// nişanlı değil buttonların kodu
middle1Teleop.addEventListener("click", () => {
  team1Task.push([["MiddleTeleop"], [4]]);
  team1Point += 4;
  FristAlliencePoints += 4;
  lastestTeam = 1;
  showPoints();
});

middle2Teleop.addEventListener("click", () => {
  team2Task.push([["MiddleTeleop"], [4]]);
  team2Point += 4;
  FristAlliencePoints += 4;
  lastestTeam = 2;
  showPoints();
});

middle3Teleop.addEventListener("click", () => {
  team3Task.push([["MiddleTeleop"], [4]]);
  team3Point += 4;
  FristAlliencePoints += 4;
  lastestTeam = 3;
  showPoints();
});

middle4Teleop.addEventListener("click", () => {
  team4Task.push([["MiddleTeleop"], [4]]);
  team4Point += 4;
  SecondAlliencePoints += 14;
  lastestTeam = 4;
  showPoints();
});

middle5Teleop.addEventListener("click", () => {
  team5Task.push([["MiddleTeleop"], [4]]);
  team5Point += 4;
  SecondAlliencePoints += 4;
  lastestTeam = 5;
  showPoints();
});

middle6Teleop.addEventListener("click", () => {
  team6Task.push([["MiddleTeleop"], [4]]);
  team6Point += 4;
  SecondAlliencePoints += 4;
  lastestTeam = 6;
  showPoints();
});

// nişanlı değil buttonların kodu
top1teleop.addEventListener("click", () => {
  team1Task.push([["TopTeleop"], [5]]);
  team1Point += 5;
  FristAlliencePoints += 5;
  lastestTeam = 1;
  showPoints();
});

top2teleop.addEventListener("click", () => {
  team2Task.push([["TopTeleop"], [5]]);
  team2Point += 5;
  FristAlliencePoints += 5;
  lastestTeam = 2;
  showPoints();
});

top3teleop.addEventListener("click", () => {
  team3Task.push([["TopTeleop"], [5]]);
  team3Point += 5;
  FristAlliencePoints += 5;
  lastestTeam = 3;
  showPoints();
});

top4teleop.addEventListener("click", () => {
  team4Task.push([["TopTeleop"], [5]]);
  team4Point += 5;
  SecondAlliencePoints += 5;
  lastestTeam = 4;
  showPoints();
});

top5teleop.addEventListener("click", () => {
  team5Task.push([["TopTeleop"], [5]]);
  team5Point += 5;
  SecondAlliencePoints += 5;
  lastestTeam = 5;
  showPoints();
});

top6teleop.addEventListener("click", () => {
  team6Task.push([["TopTeleop"], [5]]);
  team6Point += 5;
  SecondAlliencePoints += 5;
  lastestTeam = 6;
  showPoints();
});

// nişanlı değil buttonların kodu
park1.addEventListener("click", () => {
  team1Task.push([["park"], [2]]);
  team1Point += 2;
  FristAlliencePoints += 2;
  lastestTeam = 1;
  showPoints();
});

park2.addEventListener("click", () => {
  team2Task.push([["park"], [2]]);
  team2Point += 2;
  FristAlliencePoints += 2;
  lastestTeam = 2;
  showPoints();
});

park3.addEventListener("click", () => {
  team3Task.push([["park"], [2]]);
  team3Point += 2;
  FristAlliencePoints += 2;
  lastestTeam = 3;
  showPoints();
});

park4.addEventListener("click", () => {
  team4Task.push([["park"], [2]]);
  team4Point += 2;
  SecondAlliencePoints += 2;
  lastestTeam = 4;
  showPoints();
});

park5.addEventListener("click", () => {
  team5Task.push([["park"], [2]]);
  team5Point += 2;
  SecondAlliencePoints += 2;
  lastestTeam = 5;
  showPoints();
});

park6.addEventListener("click", () => {
  console.log("basıldı");
  team6Task.push([["park"], [2]]);
  team6Point += 2;
  SecondAlliencePoints += 2;
  lastestTeam = 6;
  showPoints();
});

// nişanlı değil buttonların kodu
conection1.addEventListener("click", () => {
  team1Task.push([["connection"], [5]]);
  team1Point += 5;
  FristAlliencePoints += 5;
  lastestTeam = 1;
  showPoints();
});

conection2.addEventListener("click", () => {
  team2Task.push([["connection"], [5]]);
  team2Point += 5;
  FristAlliencePoints += 5;
  lastestTeam = 2;
  showPoints();
});

conection3.addEventListener("click", () => {
  team3Task.push([["connection"], [5]]);
  team3Point += 5;
  FristAlliencePoints += 5;
  lastestTeam = 3;
  showPoints();
});

conection4.addEventListener("click", () => {
  team4Task.push([["connection"], [5]]);
  team4Point += 5;
  SecondAlliencePoints += 5;
  lastestTeam = 4;
  showPoints();
});

conection5.addEventListener("click", () => {
  team5Task.push([["connection"], [5]]);
  team5Point += 5;
  SecondAlliencePoints += 5;
  lastestTeam = 5;
  showPoints();
});

conection6.addEventListener("click", () => {
  team6Task.push([["connection"], [5]]);
  team6Point += 5;
  SecondAlliencePoints += 5;
  lastestTeam = 6;
  showPoints();
});

// nişanlı değil buttonların kodu
placed1Teleop.addEventListener("click", () => {
  team1Task.push([["PlacedTelelop"], [6]]);
  team1Point += 6;
  FristAlliencePoints += 6;
  lastestTeam = 1;
  showPoints();
});

placed2Teleop.addEventListener("click", () => {
  team2Task.push([["PlacedTelelop"], [6]]);
  team2Point += 6;
  FristAlliencePoints += 6;
  lastestTeam = 2;
  showPoints();
});

placed3Teleop.addEventListener("click", () => {
  team3Task.push([["PlacedTelelop"], [6]]);
  team3Point += 6;
  FristAlliencePoints += 6;
  lastestTeam = 3;
  showPoints();
});

placed4Teleop.addEventListener("click", () => {
  team4Task.push([["PlacedTelelop"], [6]]);
  team4Point += 6;
  SecondAlliencePoints += 6;
  lastestTeam = 4;
  showPoints();
});

placed5Teleop.addEventListener("click", () => {
  team5Task.push([["PlacedTelelop"], [6]]);
  team5Point += 6;
  SecondAlliencePoints += 6;
  lastestTeam = 5;
  showPoints();
});

placed6Teleop.addEventListener("click", () => {
  team6Task.push([["PlacedTelelop"], [6]]);
  team6Point += 6;
  SecondAlliencePoints += 6;
  lastestTeam = 6;
  showPoints();
});

// nişanlı değil buttonların kodu
notPlaced1Teleop.addEventListener("click", () => {
  team1Task.push([["notPlacedTeleop"], [10]]);
  team1Point += 10;
  FristAlliencePoints += 10;
  lastestTeam = 1;
  showPoints();
});

notPlaced2Teleop.addEventListener("click", () => {
  team2Task.push([["notPlacedTeleop"], [10]]);
  team2Point += 10;
  FristAlliencePoints += 10;
  lastestTeam = 2;
  showPoints();
});

notPlaced3Teleop.addEventListener("click", () => {
  team3Task.push([["notPlacedTeleop"], [10]]);
  team3Point += 10;
  FristAlliencePoints += 10;
  lastestTeam = 3;
  showPoints();
});

notPlaced4Teleop.addEventListener("click", () => {
  team4Task.push([["notPlacedTeleop"], [10]]);
  team4Point += 10;
  SecondAlliencePoints += 10;
  lastestTeam = 4;
  showPoints();
});

notPlaced5Teleop.addEventListener("click", () => {
  team5Task.push([["notPlacedTeleop"], [10]]);
  team5Point += 10;
  SecondAlliencePoints += 10;
  lastestTeam = 5;
  showPoints();
});

notPlaced6Teleop.addEventListener("click", () => {
  team6Task.push([["notPlacedTeleop"], [10]]);
  team6Point += 10;
  SecondAlliencePoints += 10;
  lastestTeam = 6;
  showPoints();
});

sustainability1.addEventListener("click", () => {
  star1.style.display = "block";
  team6Task.push([["sustainability"], [0]]);
  lastestTeam = 1;
});

sustainability2.addEventListener("click", () => {
  star2.style.display = "block";
  team6Task.push([["sustainability"], [0]]);
  lastestTeam = 2;
});

sustainability3.addEventListener("click", () => {
  star3.style.display = "block";
  team6Task.push([["sustainability"], [0]]);
  lastestTeam = 3;
});

sustainability4.addEventListener("click", () => {
  star4.style.display = "block";
  team6Task.push([["sustainability"], [0]]);
  lastestTeam = 4;
});

sustainability5.addEventListener("click", () => {
  star5.style.display = "block";
  team6Task.push([["sustainability"], [0]]);
  lastestTeam = 5;
});

sustainability6.addEventListener("click", () => {
  star6.style.display = "block";
  team6Task.push([["sustainability"], [0]]);
  lastestTeam = 6;
});

//buttonların resimleri taşınmasın diye yazılan kod
move1.ondragstart = (event) => {
  event.preventDefault();
};

move2.ondragstart = (event) => {
  event.preventDefault();
};

move3.ondragstart = (event) => {
  event.preventDefault();
};

move4.ondragstart = (event) => {
  event.preventDefault();
};

move5.ondragstart = (event) => {
  event.preventDefault();
};

move6.ondragstart = (event) => {
  event.preventDefault();
};

star1.ondragstart = (event) => {
  event.preventDefault();
};

star2.ondragstart = (event) => {
  event.preventDefault();
};

star3.ondragstart = (event) => {
  event.preventDefault();
};

star4.ondragstart = (event) => {
  event.preventDefault();
};

star5.ondragstart = (event) => {
  event.preventDefault();
};

star6.ondragstart = (event) => {
  event.preventDefault();
};

lower1.ondragstart = (event) => {
  event.preventDefault();
};

lower2.ondragstart = (event) => {
  event.preventDefault();
};

lower3.ondragstart = (event) => {
  event.preventDefault();
};

lower4.ondragstart = (event) => {
  event.preventDefault();
};

lower5.ondragstart = (event) => {
  event.preventDefault();
};

lower6.ondragstart = (event) => {
  event.preventDefault();
};

middle1.ondragstart = (event) => {
  event.preventDefault();
};

middle2.ondragstart = (event) => {
  event.preventDefault();
};

middle3.ondragstart = (event) => {
  event.preventDefault();
};

middle4.ondragstart = (event) => {
  event.preventDefault();
};

middle5.ondragstart = (event) => {
  event.preventDefault();
};

middle6.ondragstart = (event) => {
  event.preventDefault();
};

top1.ondragstart = (event) => {
  event.preventDefault();
};

top2.ondragstart = (event) => {
  event.preventDefault();
};

top3.ondragstart = (event) => {
  event.preventDefault();
};

top4.ondragstart = (event) => {
  event.preventDefault();
};

top5.ondragstart = (event) => {
  event.preventDefault();
};

top6.ondragstart = (event) => {
  event.preventDefault();
};

placed1.ondragstart = (event) => {
  event.preventDefault();
};

placed2.ondragstart = (event) => {
  event.preventDefault();
};

placed3.ondragstart = (event) => {
  event.preventDefault();
};

placed4.ondragstart = (event) => {
  event.preventDefault();
};

placed5.ondragstart = (event) => {
  event.preventDefault();
};

placed6.ondragstart = (event) => {
  event.preventDefault();
};

notPlaced1.ondragstart = (event) => {
  event.preventDefault();
};

notPlaced2.ondragstart = (event) => {
  event.preventDefault();
};

notPlaced3.ondragstart = (event) => {
  event.preventDefault();
};

notPlaced4.ondragstart = (event) => {
  event.preventDefault();
};

notPlaced5.ondragstart = (event) => {
  event.preventDefault();
};

notPlaced6.ondragstart = (event) => {
  event.preventDefault();
};

lower1Teleop.ondragstart = (event) => {
  event.preventDefault();
};

lower2Teleop.ondragstart = (event) => {
  event.preventDefault();
};

lower3Teleop.ondragstart = (event) => {
  event.preventDefault();
};

lower4Teleop.ondragstart = (event) => {
  event.preventDefault();
};

lower1Teleop.ondragstart = (event) => {
  event.preventDefault();
};

lower2Teleop.ondragstart = (event) => {
  event.preventDefault();
};

lower3Teleop.ondragstart = (event) => {
  event.preventDefault();
};

lower4Teleop.ondragstart = (event) => {
  event.preventDefault();
};

lower5Teleop.ondragstart = (event) => {
  event.preventDefault();
};

lower6Teleop.ondragstart = (event) => {
  event.preventDefault();
};

middle1Teleop.ondragstart = (event) => {
  event.preventDefault();
};

middle2Teleop.ondragstart = (event) => {
  event.preventDefault();
};

middle3Teleop.ondragstart = (event) => {
  event.preventDefault();
};

middle4Teleop.ondragstart = (event) => {
  event.preventDefault();
};

middle5Teleop.ondragstart = (event) => {
  event.preventDefault();
};

middle6Teleop.ondragstart = (event) => {
  event.preventDefault();
};

top1teleop.ondragstart = (event) => {
  event.preventDefault();
};

top2teleop.ondragstart = (event) => {
  event.preventDefault();
};

top3teleop.ondragstart = (event) => {
  event.preventDefault();
};

top4teleop.ondragstart = (event) => {
  event.preventDefault();
};

top5teleop.ondragstart = (event) => {
  event.preventDefault();
};

top6teleop.ondragstart = (event) => {
  event.preventDefault();
};

park1.ondragstart = (event) => {
  event.preventDefault();
};

park2.ondragstart = (event) => {
  event.preventDefault();
};

park3.ondragstart = (event) => {
  event.preventDefault();
};

park4.ondragstart = (event) => {
  event.preventDefault();
};

park5.ondragstart = (event) => {
  event.preventDefault();
};

park6.ondragstart = (event) => {
  event.preventDefault();
};

conection1.ondragstart = (event) => {
  event.preventDefault();
};

conection2.ondragstart = (event) => {
  event.preventDefault();
};

conection3.ondragstart = (event) => {
  event.preventDefault();
};

conection4.ondragstart = (event) => {
  event.preventDefault();
};

conection5.ondragstart = (event) => {
  event.preventDefault();
};

conection6.ondragstart = (event) => {
  event.preventDefault();
};

placed1Teleop.ondragstart = (event) => {
  event.preventDefault();
};

placed2Teleop.ondragstart = (event) => {
  event.preventDefault();
};

placed3Teleop.ondragstart = (event) => {
  event.preventDefault();
};

placed4Teleop.ondragstart = (event) => {
  event.preventDefault();
};

placed5Teleop.ondragstart = (event) => {
  event.preventDefault();
};

placed6Teleop.ondragstart = (event) => {
  event.preventDefault();
};

notPlaced1Teleop.ondragstart = (event) => {
  event.preventDefault();
};

notPlaced2Teleop.ondragstart = (event) => {
  event.preventDefault();
};

notPlaced3Teleop.ondragstart = (event) => {
  event.preventDefault();
};

notPlaced4Teleop.ondragstart = (event) => {
  event.preventDefault();
};

notPlaced5Teleop.ondragstart = (event) => {
  event.preventDefault();
};

notPlaced6Teleop.ondragstart = (event) => {
  event.preventDefault();
};

sustainability1.ondragstart = (event) => {
  event.preventDefault();
};

sustainability2.ondragstart = (event) => {
  event.preventDefault();
};

sustainability3.ondragstart = (event) => {
  event.preventDefault();
};

sustainability4.ondragstart = (event) => {
  event.preventDefault();
};

sustainability5.ondragstart = (event) => {
  event.preventDefault();
};

sustainability6.ondragstart = (event) => {
  event.preventDefault();
};


//buttona tıklanınca geri gittme kodu
GoBack.addEventListener("click", () => {
  ipcRenderer.send("gobackMatch2");
});

//buttona tıklanınca veri tabanına verileri kayıt etme
Nextbutton.addEventListener("click", () => {
  const db = getDatabase();
  var dateData = 0;

  const dbRef = ref(getDatabase());
  get(child(dbRef, "daysofpoints/" + date + "/value"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        dateData = parseInt(snapshot.val());
        const matchRef = ref(db, "daysofpoints/" + date);

        set(matchRef, {
          value: dateData + 1,
        });
        dateData = dateData + 1;
      } else {
        const matchRef = ref(db, "daysofpoints/" + date);

        set(matchRef, {
          value: "1",
        });
        dateData = 1;
      }
    })
    .catch((error) => {
      console.error(error);
    });

  for (let i = 0; i < team1Task.length; i++) {
    const task = team1Task[i][0][0];
    const point = team1Task[i][1][0];
    const matchRef = ref(
      db,
      "matchs/" +
      date +
      "/" +
      dateData +
      "/Red allience" +
      "/" +
      fristallience[0] +
      "/" +
      task
    );

    set(matchRef, {
      task: task,
      Point: point,
      teamPoint: team1Point,
    });
  }

  for (let i = 0; i < team2Task.length; i++) {
    const task = team2Task[i][0][0];
    const point = team2Task[i][1][0];
    const matchRef = ref(
      db,
      "matchs/" +
      date +
      "/" +
      dateData +
      "/Red allience" +
      "/" +
      fristallience[1] +
      "/" +
      task
    );

    set(matchRef, {
      task: task,
      Point: point,
      teamPoint: team2Point,
    });
  }

  for (let i = 0; i < team3Task.length; i++) {
    const task = team3Task[i][0][0];
    const point = team3Task[i][1][0];
    const matchRef = ref(
      db,
      "matchs/" +
      date +
      "/" +
      dateData +
      "/Red allience" +
      "/" +
      fristallience[2] +
      "/" +
      task
    );

    set(matchRef, {
      task: task,
      Point: point,
      matchPoint: team3Point,
    });
  }

  for (let i = 0; i < team4Task.length; i++) {
    const task = team4Task[i][0][0];
    const point = team4Task[i][1][0];
    const matchRef = ref(
      db,
      "matchs/" +
      date +
      "/" +
      dateData +
      "/Blue allience" +
      "/" +
      Secondallience[0] +
      "/" +
      task
    );

    set(matchRef, {
      task: task,
      Point: point,
      matchPoint: team4Point,
    });
  }

  for (let i = 0; i < team5Task.length; i++) {
    const task = team5Task[i][0][0];
    const point = team5Task[i][1][0];
    const matchRef = ref(
      db,
      "matchs/" +
      date +
      "/" +
      dateData +
      "/Blue allience" +
      "/" +
      Secondallience[1] +
      "/" +
      task
    );

    set(matchRef, {
      task: task,
      Point: point,
      matchPoint: team5Point,
    });
  }

  for (let i = 0; i < team6Task.length; i++) {
    const task = team6Task[i][0][0];
    const point = team6Task[i][1][0];
    const matchRef = ref(
      db,
      "matchs/" +
      date +
      "/" +
      dateData +
      "/Blue allience" +
      "/" +
      Secondallience[2] +
      "/" +
      task
    );

    set(matchRef, {
      task: task,
      Point: point,
      matchPoint: team6Point,
    });
  }

  ipcRenderer.send("ShowWarningMessagebox", {
    title: "Match",
    message: "The match has been registered in the system.",
  });
});


revokeButton.addEventListener("click", () => {
  if (lastestTeam == 1) {
    team1Point = team1Point - parseInt(team1Task[team1Task.length - 1][1]);
    team1Task.pop();
  }


  if (lastestTeam == 2) {
    team2Point = team2Point - parseInt(team2Task[team2Task.length - 1][1]);
    team2Task.pop();
  }


  if (lastestTeam == 3) {
    team3Point = team3Point - parseInt(team1Task[team3Task.length - 1][1]);
    team3Task.pop();
  }


  if (lastestTeam == 4) {
    team4Point = team4Point - parseInt(team4Task[team4Task.length - 1][1]);
    team4Task.pop();
  }


  if (lastestTeam == 5) {
    team5Point = team5Point - parseInt(team5Task[team5Task.length - 1][1]);
    team5Task.pop();
  }


  if (lastestTeam == 6) {
    team6Point = team6Point - parseInt(team6Task[team6Task.length - 1][1]);
    team6Task.pop();
  }

  showPoints();
});

ClearButton.addEventListener("click", () => {
team1Task.splice(0,team1Task.length);
team2Task.splice(0,team2Task.length);
team3Task.splice(0,team3Task.length);
team4Task.splice(0,team4Task.length);
team5Task.splice(0,team5Task.length);
team6Task.splice(0,team6Task.length);
team1Point=0;
team2Point=0;
team3Point=0;
team4Point=0;
team5Point=0;
team6Point=0;
showPoints();
});