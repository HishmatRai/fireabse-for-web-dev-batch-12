let uid;
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    if (user.emailVerified) {
      console.log("emailVerified", user);
      uid = user.uid;
    } else {
      window.location.assign("./email-verification.html");
    }
  } else {
    window.location.assign("./login.html");
  }
});

let input = document.getElementById("input");

let AddHandler = () => {
  // console.log(input.value)
  // firebase.database().ref("user/"+"user1").set({
  //   name:input.value
  // }).then(()=>{
  //   input.value=""
  // })

  firebase
    .database()
    .ref("todos/")
    .push({
      name: input.value,
      uid: uid,
      createdAt: moment().format(),
    })
    .then(() => {
      input.value = "";
    });
};

// get data

// firebase.database().ref("todos/" + "user1").on("value", (res)=>{
// console.log(res.val())
// })
// firebase.database().ref("todos/").on("value",(res)=>{
//   // console.log(res.val())
//   res.forEach((todores)=>{
// console.log(todores.val())
//   })
// })

// UPDATE DATA

// const userData = ()=>{
//   firebase.database().ref("todos/"+"-OHrazzCdIiUmeBLemJO").update({
//     name: "Update"
//   })
// }

//DELETE
// const DeleteHandler = ()=>{
//   firebase.database().ref("todos/"+"-OHrfEgW5Tz_6cLrhCPD").remove()
// }

let loading = document.getElementById("loading");
let data = document.getElementById("data");
firebase
  .database()
  .ref("todos/")
  .on("value", (res) => {
    data.innerHTML = "";
    loading.style.display = "none";
    data.style.display = "block";
    if (res.val()) {
      res.forEach((todoRes) => {
        console.log("todoRes", todoRes);
        console.log("current user uid", uid);
        let todoList = document.createElement("p");
        data.appendChild(todoList);
        // todoList.innerHTML = todoRes.val().name  + " " + moment(todoRes.val().createdAt).format('MMM DD, YYYY');
        todoList.innerHTML = todoRes.val().name  + " " + moment(todoRes.val().createdAt).fromNow();

        console.log("current user", 1);
        if (todoRes.val().uid === uid) {
          // edit button
          let editButton = document.createElement("button");
          todoList.appendChild(editButton);
          editButton.innerHTML = "Edit";
          // delete button
          let deleteButton = document.createElement("button");
          todoList.appendChild(deleteButton);
          deleteButton.innerHTML = "Delete";
          // edit function
          editButton.addEventListener("click", () => {
            let editTodo = prompt("Edit todo", todoRes.val().name);
            firebase
              .database()
              .ref("todos/" + todoRes.key)
              .update({
                name: editTodo,
              });
          });
          // delete function
          deleteButton.addEventListener("click", () => {
            const swalWithBootstrapButtons = Swal.mixin({
              customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger",
              },
              buttonsStyling: false,
            });
            swalWithBootstrapButtons
              .fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel!",
                reverseButtons: true,
              })
              .then((result) => {
                if (result.isConfirmed) {
                  swalWithBootstrapButtons.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                  });
                  firebase
                    .database()
                    .ref("todos/" + todoRes.key)
                    .remove();
                } else if (
                  /* Read more about handling dismissals below */
                  result.dismiss === Swal.DismissReason.cancel
                ) {
                  swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Your imaginary file is safe :)",
                    icon: "error",
                  });
                }
              });
          });
        }
      });
    } else {
      let message = document.createElement("p");
      data.appendChild(message);
      message.innerHTML = "Data not found!";
    }
  });
