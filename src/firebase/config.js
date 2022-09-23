import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBBL7W6Lm8KdHfpbYnFMJIkL7_gCSXL-u0",
  authDomain: "finance-tracker-f692b.firebaseapp.com",
  projectId: "finance-tracker-f692b",
  storageBucket: "finance-tracker-f692b.appspot.com",
  messagingSenderId: "477997431258",
  appId: "1:477997431258:web:e21633c93b95708ce1e8e3"
}

// initialize firebase
initializeApp(firebaseConfig)

// initilize firebase services -- firestore and auth
const projectFirestore = getFirestore()
const projectAuth = getAuth()

export {
  projectFirestore,
  projectAuth
}