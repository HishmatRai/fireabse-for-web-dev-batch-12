let message = document.getElementById("message");
let singUpBtn = document.getElementById("sing-up-btn");
let singUpBtnTxt = document.getElementById("sing-up-btn-txt");
let loading = document.getElementById("loading");
let email = document.getElementById("email");
let password = document.getElementById("password");
const signUpHandler = () => {
  singUpBtn.innerHTML = "Loading ...";
  singUpBtnTxt.style.display = "none";
  loading.style.display = "block";
  firebase
    .auth()
    .createUserWithEmailAndPassword(email.value, password.value)
    .then((res) => {
      // 
      firebase
        .auth()
        .currentUser.sendEmailVerification()
        .then(() => {
          console.log(res.user);
          message.innerHTML = "Success !";
          message.style.color = "green";
          singUpBtn.innerHTML = "Sign Up";
          singUpBtnTxt.style.display = "block";
          loading.style.display = "none";
          setTimeout(() => {
            window.location.assign("./email-verification.html");
          }, 2000);
        });
    })
    .catch((error) => {
      console.log(error.message);
      message.innerHTML = error.message;
      message.style.color = "red";
      singUpBtn.innerHTML = "Sign Up";
      singUpBtnTxt.style.display = "block";
      loading.style.display = "none";
    });
};
