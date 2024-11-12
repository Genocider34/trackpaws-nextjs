import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCWrvb4U26fRoOi1uF9lOTXFLXyLLgPBD0",
    authDomain: "trackpaws-608c0.firebaseapp.com",
    databaseURL: "https://trackpaws-608c0-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "trackpaws-608c0",
    storageBucket: "trackpaws-608c0.appspot.com",
    messagingSenderId: "314396343479",
    appId: "1:314396343479:web:c8ae9b8dbbc0d88dc8e132",
    measurementId: "G-M0192M05QG"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);