import firebase from "firebase";
require('firebase/firestore');

var firebaseConfig = null;

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();