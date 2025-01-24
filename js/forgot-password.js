let email = document.getElementById("email");
let message = document.getElementById("message");
let button = document.getElementById("button");
let sendEmailHandler = () => {
  button.innerHTML = "Loading ...";
  firebase
    .auth()
    .sendPasswordResetEmail(email.value)
    .then(() => {
      message.innerHTML = "Password reset email sent!";
      message.style.color = "green";
      button.innerHTML = "Send email";
    })
    .catch((error) => {
      console.log(error.message);
      message.innerHTML = error.message;
      message.style.color = "red";
      button.innerHTML = "Send email";
    });
};
