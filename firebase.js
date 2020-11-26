const name = document.querySelector("#name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const number = document.querySelector("#number");
var firebaseConfig = {
  apiKey: "AIzaSyCwlOUVzYhFs0tkoL_Dg-9-jvRIWIQmFI8",
    authDomain: "clickandshop-a1dc1.firebaseapp.com",
    databaseURL: "https://clickandshop-a1dc1.firebaseio.com",
    projectId: "clickandshop-a1dc1",
    storageBucket: "clickandshop-a1dc1.appspot.com",
    messagingSenderId: "968297252484",
    appId: "1:968297252484:web:20023d9e06ca5c0532a4d1",
    measurementId: "G-KWVME38PMW"
};
// Initialize Firebase
var app = firebase.initializeApp(firebaseConfig);
var db = firebase.firestore(app);
var database = firebase.database();
var firebase = firebase.auth();
document.getElementById("submit").addEventListener("click", writeData);

function writeData() {
  const userName = name.value;
  const userEmail = email.value;
  const userPassword = password.value;
  const userNumber = number.value;
  //   db.collection("users")
  //     .add({
  //       name: userName,
  //       email: userEmail,
  //       number: userNumber,
  //     })
  //     .then(function (value) {
  //       console.log("success ", value);
  //     })
  //     .catch(function (e) {
  //       console.log(e);
  //     });
  if (userEmail !== null || userPassword !== null) {
    firebase
      .createUserWithEmailAndPassword(userEmail, userPassword)
      .then((user) => {
        firebase.onAuthStateChanged((user) => {
          if (user) {
            var uId = user.uid;
            console.log(uId);
            database
              .ref("/Admin/" + uId)
              .set({  
                Name: userName,
                Email: userEmail,
                Password:userPassword,
                ContactNo: userNumber,
              })
              .then(() => {
                console.log("success");
              })
              .catch((e) => {
                console.log(e);
              });
          }
        });
      })
      .catch((error) => {
        var errorMessage = error.message;
        console.log(errorMessage);
      });
  } else {
    window.alert("Enter Email and Password");
  }
}





    
  
    
