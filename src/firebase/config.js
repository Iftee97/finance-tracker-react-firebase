import firebase from "firebase"
import "firebase/firestore"
import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBBL7W6Lm8KdHfpbYnFMJIkL7_gCSXL-u0",
  authDomain: "finance-tracker-f692b.firebaseapp.com",
  projectId: "finance-tracker-f692b",
  storageBucket: "finance-tracker-f692b.appspot.com",
  messagingSenderId: "477997431258",
  appId: "1:477997431258:web:e21633c93b95708ce1e8e3"
}

// initialize firebase
firebase.initializeApp(firebaseConfig)

// initilize firebase services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

export {
  projectFirestore,
  projectAuth
}
