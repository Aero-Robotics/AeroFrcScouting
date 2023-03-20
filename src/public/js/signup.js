//importlar ve değişkenler
const electron = require('electron');
const { ipcRenderer } = electron;
const firebase = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth');
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
    const app1 = firebase.initializeApp(firebaseConfig);
    const auth = getAuth(app1);
    const emailsgn = document.getElementById("emailTextsgn");
    const passwordsgn = document.getElementById("passwordTextsgn");
    const confpasswordsgn = document.getElementById("ComfirmPasssgn");
    const signupsgn = document.getElementById("SignUpButtonsgn");
    const backbtn = document.getElementById("back");
    let github = document.querySelector("#githubLogo");

    //fonksiyonlar
    function SignUp()
    {
      var emailin = emailsgn.value;
      var passwordin = passwordsgn.value;
      var passwordconfirm = confpasswordsgn.value;

      //şifre diğer texboxdaki şifreyle uyuşmuyorsa ekrana yazı göstereme
      if (passwordin != passwordconfirm) {
        ipcRenderer.send("ShowWarningMessagebox",{title:'password',message:"passwords do not match"});
        document.getElementById("passwordTextsgn").value = "";
        document.getElementById("ComfirmPasssgn").value = "";
      } 
      else {
        //eğer ikisi eşleşiyorsa şifere 8 haneden küçükse ekrana mesaj gösterme
        if (passwordin.length < 8) {
          ipcRenderer.send("ShowWarningMessagebox",{title:'short password',message:" password must be bigger than 8 digits"});
        }
        else{
        createUserWithEmailAndPassword(auth, emailin, passwordin)
          .then((userCredential) => {
            //şife doğruysa sign up işlemini gerçekleştir
            ipcRenderer.send("goBackSign");
            ipcRenderer.send("ShowInfoMessagebox",{title:'account',message:'the account created succsesfully'});
          })
          .catch((error) => {
            //eğer şiftre yanlışsa ekrana mesaj gösterme
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(error);
            if(errorCode=="auth/email-already-in-use"){
              //eğer o epostayla başka bir kullanıcı varsa kullanıcıyı uyarma
              ipcRenderer.send("ShowWarningMessagebox",{title:'Email',message:"Email already in use"});
            }else{
              ipcRenderer.send("ShowErrorMessagebox",{title:'eror',message:error});
            }
          })
        }
      }
    }

    //eventler
    backbtn.addEventListener("click",function(){
      //main.js'e geri login ekranına geri gönder mesajı verme
        ipcRenderer.send("goBackSign");
    })

    signupsgn.addEventListener("click", function () {    
      SignUp();
    });

    confpasswordsgn.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        SignUp();
      }
    });

    github.addEventListener("click", () => {
      //github logosuna basınca githuba yönlendirme
      electron.shell.openExternal("https://github.com/AeroRoboticTeams");
    });