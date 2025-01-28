let email = document.getElementById("email");
let password = document.getElementById("password");
let message = document.getElementById("message");
let button = document.getElementById("button");
const sigInHandler = () => {
  button.innerHTML = "Loading ...";
  firebase
    .auth()
    .signInWithEmailAndPassword(email.value, password.value)
    .then((res) => {
      console.log(res.user);
      message.innerHTML = "Success !";
      message.style.color = "green";
      button.innerHTML = "Sign In";
      setTimeout(() => {
        if (res.user.emailVerified) {
          window.location.assign("./home.html");
        } else {
          window.location.assign("./email-verification.html");
        }
      }, 2000);
    })
    .catch((error) => {
      console.log(error);
      message.innerHTML = "Email or Password incorrect!";
      message.style.color = "red";
      button.innerHTML = "Sign In";
    });
  // message.innerHTML = "Message"
  // setTimeout(() => {
  //   button.innerHTML = "Sign In";
  // }, 2000);
};

// login with google
const loginWithGoogleHandler = () => {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      console.log("result", result);
      window.location.assign("./home.html");
    })
    .catch((error) => {
      var errorMessage = error.message;
      console.log("errorMessage", errorMessage);
    });
};

// facebook
const loginWithFacebookHandler = () => {
  var provider = new firebase.auth.FacebookAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      console.log("result", result);
    })
    .catch((error) => {
      console.log("error", error);
    });
};
