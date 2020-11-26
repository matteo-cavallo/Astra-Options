import firebase from "firebase";
require("firebase/firestore");

import firebaseConfig from "./credentials.js";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
export default db;

export async function getTemplatesByShop(shop) {
  let templates = [];

  await db
    .collection("templates")
    .where("shop", "==", shop)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        templates = [doc.data(), ...templates];
      });
    })
    .catch((e) => {
      console.log("Error Firebase: Query Products Templates", e);
      ctx.res.statusCode = 403;
    });

  return templates;
}
