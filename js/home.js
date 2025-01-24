firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    if (user.emailVerified) {
      console.log("emailVerified", user);
    } else {
      window.location.assign("./email-verification.html");
    }
  } else {
    window.location.assign("./login.html");
  }
});

// log out
const logOutHandler = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      window.location.assign("./login.html");
    });
};

// current user

const activeUserHandler = () => {
  console.log("active user", firebase.auth().currentUser);
};
