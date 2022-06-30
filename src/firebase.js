import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/functions';

const firebaseConfig = {
  apiKey: "AIzaSyCaoMy3v4Wk67kWP15KIus4ekRh7iTAbvE",
  authDomain: "instagram-replica-5cc3d.firebaseapp.com",
  projectId: "instagram-replica-5cc3d",
  storageBucket: "instagram-replica-5cc3d.appspot.com",
  messagingSenderId: "800646289987",
  appId: "1:800646289987:web:645104b4e765f98d8412f6",
  measurementId: "G-C5GXBQ838S"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const functions = firebase.functions();
  
export { auth, db, storage, functions };
