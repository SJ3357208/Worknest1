// src/firebase.ts

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // If you plan to use Cloud Firestore

// Your Firebase configuration (replace with your actual values from the Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyAFB1_h9QZW6ykrh6xttxn8hKhcPuhaxfg", // Example API Key
  authDomain: "worknest-b8e91.firebaseapp.com",
  projectId: "worknest-b8e91",
  storageBucket: "worknest-b8e91.firebasestorage.app",
  messagingSenderId: "578966655707",
  appId: "1:578966655707:web:4e3aa3680a4bfc066432fe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services and export them for use throughout your app
export const auth = getAuth(app);
export const db = getFirestore(app); // Example for Cloud Firestore

// You might also export the 'app' instance itself if needed, though often not directly
// export { app };
