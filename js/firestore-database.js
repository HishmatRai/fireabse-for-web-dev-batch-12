// firebase.database().ref("folder"+"id").set({})
// firebase.database().ref("folder").push({})

let input = document.getElementById("input");
let addHandler = () => {
  //   firebase
  //     .firestore()
  //     .collection("testing")
  //     .doc("testing-2")
  //     .set({
  //       name: input.value,
  //     })
  //     .then((res) => {
  //       console.log("Document successfully written!", res);
  //       input.value = "";
  //     })
  //     .catch((error) => {
  //       console.error("Error writing document: ", error);
  //     });

  firebase
    .firestore()
    .collection("testing")
    .add({
      name: input.value,
      id: "",
      isVerified: false,
      phone:""
    })
    .then((res) => {
      console.log("Document successfully written!", res);
      input.value = "";
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
};

// firebase
//   .database()
//   .ref("folder" + "id")
//   .on("value", (res) => {
//     console.log(res.val());
//   });
// firebase
//   .database()
//   .ref("folder")
//   .on("value", (res) => {
//     res.forEach((dataRes) => {
//       console.log(dataRes.val());
//     });
//   });

// firebase
//   .firestore()
//   .collection("testing")
//   .doc("testing-1")
//   .get()
// // onSnapshot
//   .then((res) => {
//     console.log(res.data());
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// firebase
//   .firestore()
//   .collection("testing")
//   .where("isVerified", "==", false)
//   .get()
//   // onSnapshot
//   .then((res) => {
//     res.forEach((dataRes) => {
//       // if(dataRes.data().isVerified){
// // 
//         console.log(dataRes.data());
//       // }
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });


firebase
  .firestore()
  .collection("testing")
  .where("name", "==", true)
  .onSnapshot((querySnapshot) => {
    // var cities = [];
    querySnapshot.forEach((dataRes) => {
        // cities.push(doc.data());
        console.log(dataRes.data());
    });
    // console.log("Current cities in CA: ", cities);
});



// edit
const editHandler = () => {
  // firebase.database().ref("folder"+"id").update({
  //     name:"fsdfs"
  // })

  //   firebase.firestore().collection("testing").doc("testing-1").update({
  //     name: "Updated",
  //   });

  // delete
  // firebase.database().ref("folder"+"id").remove();
  firebase
    .firestore()
    .collection("testing")
    .doc("testing-1")
    .delete()
    .then(() => {
      console.log("Document successfully deleted!");
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
};
