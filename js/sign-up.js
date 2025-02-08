let message = document.getElementById("message");
let singUpBtn = document.getElementById("sing-up-btn");
let singUpBtnTxt = document.getElementById("sing-up-btn-txt");
let loading = document.getElementById("loading");
let email = document.getElementById("email");
let password = document.getElementById("password");
let firstName = document.getElementById("first-name");
let lastName = document.getElementById("last-name");
let phone = document.getElementById("phone");
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
          message.innerHTML = "Success !";
          message.style.color = "green";
          singUpBtn.innerHTML = "Sign Up";
          singUpBtnTxt.style.display = "block";
          loading.style.display = "none";
          firebase
            .database()
            .ref("users/" + res.user.uid)
            .set({
              firstName: firstName.value,
              lastName: lastName.value,
              phone: phone.value,
              email: email.value,
              password: password.value,
            
            })
            .then(() => {
              setTimeout(() => {
                window.location.assign("./email-verification.html");
              }, 2000);
            });
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
