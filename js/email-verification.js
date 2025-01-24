let email = document.getElementById("email");
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    if (user.emailVerified) {
      window.location.assign("./home.html");
    } else {
      email.innerHTML = user.email;
    }
  } else {
    window.location.assign("./login.html");
  }
});

// go home
const goHomeHandler = () => {
  const user = firebase.auth().currentUser;
  if (user.emailVerified) {
    window.location.assign("./home.html");
  }
};

// re-send
let message = document.getElementById("message");
const reSendHandler = () => {
  firebase
    .auth()
    .currentUser.sendEmailVerification()
    .then(() => {
      message.innerHTML = "Email verification sent!";
      message.style.color = "green";
      // Email verification sent!
      // ...
    })
    .catch((error) => {
        message.innerHTML = error.message;
      message.style.color = "red";
      console.log("error", error);
    });
};




