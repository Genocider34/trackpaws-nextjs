// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWrvb4U26fRoOi1uF9lOTXFLXyLLgPBD0",
  authDomain: "trackpaws-608c0.firebaseapp.com",
  databaseURL:
    "https://trackpaws-608c0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "trackpaws-608c0",
  storageBucket: "trackpaws-608c0.appspot.com",
  messagingSenderId: "314396343479",
  appId: "1:314396343479:web:c8ae9b8dbbc0d88dc8e132",
  measurementId: "G-M0192M05QG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app);
export const db = getFirestore(app);
