// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAa3YQ25YWTFucRMkOQ-OlOoLCpufYQRA0",
  authDomain: "studio-7288056970-f677d.firebaseapp.com",
  projectId: "studio-7288056970-f677d",
  storageBucket: "studio-7288056970-f677d.firebasestorage.app",
  messagingSenderId: "886609621231",
  appId: "1:886609621231:web:e238fc30bd68f25bd76b1a"
};

// Initialize Firebase (checking if it already exists to prevent re-initialization errors in Next.js)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
