// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // ← DODANE

const firebaseConfig = {
    apiKey: "AIzaSyCcIyJB3vFjqG-zWhpXYHMCPGHSM0hMfq8",
    authDomain: "festlink-app.firebaseapp.com",
    projectId: "festlink-app",
    storageBucket: "festlink-app.appspot.com",
    messagingSenderId: "118237475670",
    appId: "1:118237475670:web:d570e6b4951b68af9b5cf7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // ← DODANE

export { db, auth }; // ← TERAZ eksportujesz auth

