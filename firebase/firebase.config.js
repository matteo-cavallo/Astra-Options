import firebase from "firebase";
import {firebaseConfig} from './credentials.js';
require('firebase/firestore');

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();