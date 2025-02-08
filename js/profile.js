let firstName = document.getElementById("first-name");
let lastName = document.getElementById("last-name");
let phoneNumber = document.getElementById("phone-number");
let email = document.getElementById("email");
let profileURL = document.getElementById("profile-image");
let uid;
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    if (user.emailVerified) {
      uid = user.uid;
      // get current user data
      console.log(uid);
      firebase
        .database()
        .ref("users/" + uid)
        .on("value", (userREs) => {
          console.log(userREs.val());
          let user = userREs.val();
          firstName.value = user.firstName;
          lastName.value = user.lastName;
          phoneNumber.value = user.phone;
          email.value = user.email;
          profileURL.src = user.profileURL
            ? user.profileURL
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwdIVSqaMsmZyDbr9mDPk06Nss404fosHjLg&s";
          // if (user.profileURL) {
          //   profileURL.src = user.profileURL;
          // } else {
          //   profileURL.src =
          //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwdIVSqaMsmZyDbr9mDPk06Nss404fosHjLg&s";
          // }
        });
      // displayName.value = user.displayName;
      // email.value = user.email;
      // phoneNumber.value = user.phoneNumber;
      // uid.value = user.uid;
      // profileImage.src = user.photoURL
      //   ? user.photoURL
      //   : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwdIVSqaMsmZyDbr9mDPk06Nss404fosHjLg&s";
      // photoURL.value = user.photoURL;
    } else {
      window.location.assign("./email-verification.html");
    }
  } else {
    window.location.assign("./login.html");
  }
});

// update
const updateHandler = () => {
  // firebase
  //   .auth()
  //   .currentUser.updateProfile({
  //     displayName: displayName.value,
  //     photoURL: photoURL.value,
  //     phoneNumber: phoneNumber.value,
  //   })
  //   .then(() => {
  //     console.log("Update successful");
  //     profileImage.src = photoURL.value;
  //   })
  //   .catch((error) => {
  //     console.log("error", error);
  //   });

  firebase
    .database()
    .ref("users/" + uid)
    .update({
      firstName: firstName.value,
      lastName: lastName.value,
      phone: phoneNumber.value,
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

// file upload
let progress = document.getElementById("progress");
let progressValue = document.getElementById("progress-value");
const uploadHandler = (event) => {
  progress.style.display = "block";
  var storageRef = firebase.storage().ref();
  var uploadTask = storageRef
    .child(`profile-images/${uid}`)
    .put(event.target.files[0]);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      progressValue.innerHTML = `${Math.floor(progress)} %`;
      progressValue.style.width = `${Math.floor(progress)}%`;
    },
    (error) => {
      // Handle unsuccessful uploads
    },
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        console.log("File available at", downloadURL);
        firebase
          .database()
          .ref("users/" + uid)
          .update({
            profileURL: downloadURL,
          })
          .then(() => {
            progress.style.display = "none";
          });
      });
    }
  );
};
