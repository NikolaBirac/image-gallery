import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAOLoF_bDknv2PiKTADglHRY2uPf78wIpo",
  authDomain: "image-gallery-5b102.firebaseapp.com",
  projectId: "image-gallery-5b102",
  storageBucket: "image-gallery-5b102.appspot.com",
  messagingSenderId: "773415026658",
  appId: "1:773415026658:web:dc8e34a8b19afbe27c03bb"
}

// init firebase
initializeApp(firebaseConfig)

// init services
const db = getFirestore()

export { db }