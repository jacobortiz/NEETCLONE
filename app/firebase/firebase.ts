import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// fix
const firebaseConfig = {
  apiKey: "AIzaSyBBlOh32ZuBPylFpqUfnmAbHFuZMgJYFFc",
  authDomain: "neetclone-3376a.firebaseapp.com",
  projectId: "neetclone-3376a",
  storageBucket: "neetclone-3376a.appspot.com",
  messagingSenderId: "332215291561",
  appId: "1:332215291561:web:6213a98fa96324daf223b8"
};

const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app)
const firestore = getFirestore(app)

export { app, auth, firestore }