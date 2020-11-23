import firebase from "firebase";
require('firebase/firestore');

import firebaseConfig from './firebase.credentials';


firebase.initializeApp(firebaseConfig);

export default firebase.firestore();