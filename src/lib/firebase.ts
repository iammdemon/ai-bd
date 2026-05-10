import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPNJqm19a7fT6DvnwWjLr3mgSpLC1qyqo",
  authDomain: "aibangladesh-3152e.firebaseapp.com",
  projectId: "aibangladesh-3152e",
  storageBucket: "aibangladesh-3152e.firebasestorage.app",
  messagingSenderId: "403220901702",
  appId: "1:403220901702:web:6291252afd2b9e5b467f47"
};

// Initialize Firebase (safeguarded for Next.js Fast Refresh and Server-Side Rendering)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize and export services for easy access across components
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
