const electron = require("electron");
const { ipcRenderer } = electron;
const firebase = require("firebase/app");
const { getDatabase, ref, set,child,get} = require("firebase/database");

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
const now = new Date();
const date = now.getDay() + "-" + now.getMonth() + 1 + "-" + now.getFullYear();

const LblTeam1 = document.getElementById("lblTeam1");
const LblTeam2 = document.getElementById("lblTeam2");
const LblTeam3 = document.getElementById("lblTeam3");
const LblTeam4 = document.getElementById("lblTeam4");
const LblTeam5 = document.getElementById("lblTeam5");
const LblTeam6 = document.getElementById("lblTeam6");
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
const Nextbutton = document.getElementById("NextButton2");
const GoBack = document.getElementById("gobackButton2");


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
fristallience[i] = fristallience[i].replace(/\./g, '%2E');
  }

  for (let i = 0; i < Secondallience.length; i++) {
   Secondallience[i] = Secondallience[i].replace(/\./g, '%2E');
      }


});

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

Nextbutton.addEventListener("click", () => {
  const db = getDatabase();
  var dateData = 0;

  const dbRef = ref(getDatabase());
  get(child(dbRef,"daysofpoints/"+date+"/value")).then((snapshot) => {
    if (snapshot.exists()) {
    dateData =  parseInt( snapshot.val());
    const matchRef = ref(
      db,
      "daysofpoints/"+date
    );

    set(matchRef, {
      value:dateData+1
    });
    dateData = dateData+1;
    } else {
      const matchRef = ref(
        db,
        "daysofpoints/"+date
      );
  
      set(matchRef, {
        value:'1'
      });
      dateData=1;
    }
  }).catch((error) => {
    console.error(error);
  });
  

  for (let i = 0; i < team1Task.length; i++) {
    const task = team1Task[i][0][0];
    const point = team1Task[i][1][0];
    const matchRef = ref(
      db,
      "matchs/" + date  + "/"+dateData+ "/" +fristallience[0] + "/" + task
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
      "matchs/" + date + "/" + dateData + "/" + fristallience[1] + "/" + task
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
      "matchs/" + date + "/" + dateData + "/" + fristallience[2] + "/" + task
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
      "matchs/" + date + "/" + dateData + "/" + Secondallience[0] + "/" + task
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
      "matchs/" + date + "/" + dateData + "/" + Secondallience[1] + "/" + task
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
      "matchs/" + date + "/" + dateData + "/" + Secondallience[2] + "/" + task
    );

    set(matchRef, {
      task: task,
      Point: point,
      matchPoint: team6Point,
    });
  }
  console.log("veri tabanına yazıldı");
});

move1.addEventListener("click", () => {
  team1Task.push([["move"], [3]]);
  team1Point += 3;
  FristAlliencePoints += 3;
});

move2.addEventListener("click", () => {
  team2Task.push([["move"], [3]]);
  team2Point += 3;
  FristAlliencePoints += 3;
});

move3.addEventListener("click", () => {
  team3Task.push([["move"], [3]]);
  team3Point += 3;
  FristAlliencePoints += 3;
});

move4.addEventListener("click", () => {
  team4Task.push([["move"], [3]]);
  team4Point += 3;
  SecondAlliencePoints += 3;
});

move5.addEventListener("click", () => {
  team5Task.push([["move"], [3]]);
  team5Point += 3;
  SecondAlliencePoints += 3;
});

move6.addEventListener("click", () => {
  team6Task.push([["move"], [3]]);
  team6Point += 3;
  SecondAlliencePoints += 3;
});

GoBack.addEventListener("click", () => {
  ipcRenderer.send("gobackMatch2");
});
