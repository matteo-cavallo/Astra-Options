import firebase from "firebase";
import {firebaseConfig} from './credentials.js';
require('firebase/firestore');

import firebaseConfig from './firebase.credentials';


firebase.initializeApp(firebaseConfig);

export default firebase.firestore();