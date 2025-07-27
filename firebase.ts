// src/firebase.ts

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // If you plan to use Cloud Firestore
import { getStorage } from "firebase/storage";

// Your Firebase configuration (replace with your actual values from the Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyAFB1_h9QZW6ykrh6xttxn8hKhcPuhaxfg", // Example API Key
  authDomain: "worknest-b8e91.firebaseapp.com",
  projectId: "worknest-b8e91",
  storageBucket: "worknest-b8e91.firebasestorage.app",
  messagingSenderId: "578966655707",
  appId: "1:578966655707:web:4e3aa3680a4bfc066432fe"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); 

export { auth, db, storage }; 