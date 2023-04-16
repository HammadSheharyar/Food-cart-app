//import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAohL-_uaYtv5MfrG8kMc-Y6TjdP9e7OBM",
  authDomain: "foodcart-app-a8b31.firebaseapp.com",
  databaseURL: "https://foodcart-app-a8b31-default-rtdb.firebaseio.com",
  projectId: "foodcart-app-a8b31",
  storageBucket: "foodcart-app-a8b31.appspot.com",
  messagingSenderId: "1042156074094",
  appId: "1:1042156074094:web:95953b25eb2f86a31f227f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

// const appSettings = {
//   databaseUrl: "https://foodcart-app-a8b31-default-rtdb.firebaseio.com/",
// };

//const app = initializeApp(appSettings);
//console.log(app);

const database = getDatabase(app);
const shopingListinDB = ref(database, "shopingList");

const inputFeildElement = document.getElementById("input-field");
const addbuttonElement = document.getElementById("add-button");
const shoppingListElement = document.getElementById("shopping-list");

addbuttonElement.addEventListener("click", function () {
  let input = inputFeildElement.value;
  push(shopingListinDB, input);

  //appendItemshoppingList(input);

  clearInputfieldEl();

  //console.log(`${input} added to database`);

  //console.log(input);
});

const clearInputfieldEl = () => {
  inputFeildElement.value = "";
};

const appendItemshoppingList = (item) => {
  //shoppingListElement.innerHTML += `<li>${itemvalue}</li> `;

  let itemId = item[0];
  let itemvalue = item[1];

  let newElement = document.createElement("li");
  newElement.textContent = itemvalue;

  newElement.addEventListener("click", function () {
    console.log(itemId);

    let ExectloccationofElementinDB = ref(database, `shopingList/${itemId}`);
    remove(ExectloccationofElementinDB);
  });
  shoppingListElement.append(newElement);
};

onValue(shopingListinDB, function (snapshot) {
  //console.log(snapshot.val());

  if (snapshot.exists()) {
    let itemArrays = Object.entries(snapshot.val());
    //console.log(itemArrays);

    //console.log(snapshot.val());

    clearShoppinglist();

    for (let i = 0; i < itemArrays.length; i++) {
      //console.log(itemArrays[i]);
      //get both the id and the name of the item
      let currentItem = itemArrays[i];

      let currentItemId = currentItem[0];
      let currentItemValue = currentItem[1];

      appendItemshoppingList(currentItem);
    }
  } else {
    shoppingListElement.innerHTML = "No items... yet";
  }
});

function clearShoppinglist() {
  shoppingListElement.innerHTML = " ";
}
