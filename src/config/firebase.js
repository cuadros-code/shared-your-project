import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey           : "AIzaSyAnkSFmcRPTtMJ-ITcMp6akCEAbSTjb3GQ",
    authDomain       : "shared-your-project.firebaseapp.com",
    projectId        : "shared-your-project",
    storageBucket    : "shared-your-project.appspot.com",
    messagingSenderId: "425340739043",
    appId            : "1:425340739043:web:df4ec6ad6bc964b5df14d6"
}

// Initialize Firebase
firebase.apps.length = 0 ? firebase.initializeApp(firebaseConfig) : firebase.app()

const firestore = firebase.firestore()
const storage = firebase.storage()

export {
    firebase,
    firestore,
    storage
}

