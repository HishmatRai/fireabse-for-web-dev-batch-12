let loading = document.getElementById("loading");
let data = document.getElementById("data");
let uid;
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    if (user.emailVerified) {
      uid = user.uid;
    } else {
      window.location.assign("./email-verification.html");
    }
  } else {
    window.location.assign("./login.html");
  }
});

firebase
  .database()
  .ref("todos/")
  .on("value", (res) => {
    data.innerHTML = "";
    loading.style.display = "none";
    data.style.display = "block";
    let todos = [];
    if (res.val()) {
      res.forEach((todoRes) => {
        let todoData = todoRes.val();
        if (todoData.uid === uid) {
          todos.push(todoData);
        }
      });

      if (todos.length === 0) {
        let message = document.createElement("p");
        data.appendChild(message);
        message.innerHTML = "Todo Not Found!";
      } else {
        todos.map((val) => {
          let todoList = document.createElement("p");
          data.appendChild(todoList);
          todoList.innerHTML = val.name;
        });
      }
    } else {
      let message = document.createElement("p");
      data.appendChild(message);
      message.innerHTML = "Data not found!";
    }
  });
