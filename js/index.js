firebase.auth().onAuthStateChanged((res) => {
  if (res) {
    if (res.emailVerified) {
      window.location.assign("./pages/home.html");
    } else {
      window.location.assign("./pages/email-verification.html");
    }
  } else {
    window.location.assign("./pages/login.html");
  }
});
