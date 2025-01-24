let displayName = document.getElementById("display-name");
let email = document.getElementById("email");
let phoneNumber = document.getElementById("phone-number");
let uid = document.getElementById("uid");
let photoURL = document.getElementById("photo-url");
let profileImage = document.getElementById("profile-image");
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    if (user.emailVerified) {
      displayName.value = user.displayName;
      email.value = user.email;
      phoneNumber.value = user.phoneNumber;
      uid.value = user.uid;
      profileImage.src = user.photoURL
        ? user.photoURL
        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwdIVSqaMsmZyDbr9mDPk06Nss404fosHjLg&s";
      photoURL.value = user.photoURL;
    } else {
      window.location.assign("./email-verification.html");
    }
  } else {
    window.location.assign("./login.html");
  }
});

// update
const updateHandler = () => {
  firebase
    .auth()
    .currentUser.updateProfile({
      displayName: displayName.value,
      photoURL: photoURL.value,
      phoneNumber: phoneNumber.value,
    })
    .then(() => {
      console.log("Update successful");
      profileImage.src = photoURL.value;
    })
    .catch((error) => {
      console.log("error", error);
    });
};

// change email
let changeEmail = document.getElementById("change-email");
let changeEmailMessage = document.getElementById("change-email-message");
const changeEmailHandler = () => {
  const user = firebase.auth().currentUser;
  user
    .updateEmail(changeEmail.value)
    .then((res) => {
      console.log("res", res);
      changeEmailMessage.innerHTML = "Update successful";
      changeEmailMessage.style.color = "green";
    })
    .catch((error) => {
      console.log(error.message);
      changeEmailMessage.innerHTML = error.message;
      changeEmailMessage.style.color = "red";
    });
};

// delete account
const deleteAccountHandler = () => {
  const user = firebase.auth().currentUser;
  user
    .delete()
    .then((res) => {
      // User deleted.
      console.log("User deleted.", res);
    })
    .catch((error) => {
      // An error ocurred
      // ...
      console.log(error);
    });
};

// change password
let newPassword = document.getElementById("new-password");
let confrimPassword = document.getElementById("confrim-password");
let changePasswordMessage = document.getElementById("change-password-message");
const changePasswordHandler = () => {
  if (newPassword.value !== confrimPassword.value) {
    changePasswordMessage.innerHTML = "Please enter same password";
    changePasswordMessage.style.color = "red";
  } else {
    const user = firebase.auth().currentUser;
    user
      .updatePassword(newPassword.value)
      .then(() => {
        changePasswordMessage.innerHTML = "Update successful";
        changePasswordMessage.style.color = "green";
      })
      .catch((error) => {
        console.log("error", error.message);
        changePasswordMessage.innerHTML = error.message;
        changePasswordMessage.style.color = "red";
      });
  }
};
