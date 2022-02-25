import firebase from "firebase/app";
import 'firebase/storage'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDa6RQibKeQ6rAxgxEaSofOCVfP9-NmoIc",
  authDomain: "gallery-8ea08.firebaseapp.com",
  projectId: "gallery-8ea08",
  storageBucket: "gallery-8ea08.appspot.com",
  messagingSenderId: "105668786956",
  appId: "1:105668786956:web:65d7d9486ddbc04b6ee729"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectAuth = firebase.auth()
const db = firebase.firestore()
const projectStorage = firebase.storage()
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { db, projectAuth, projectStorage, timestamp }