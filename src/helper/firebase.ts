// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyACZKgIA9FhkHEEu5qSLUYb0lp_cCTt02E",
  authDomain: "auth-1e588.firebaseapp.com",
  projectId: "auth-1e588",
  storageBucket: "auth-1e588.appspot.com",
  messagingSenderId: "255698490081",
  appId: "1:255698490081:web:dcb030dfc88126de23dda0",
  measurementId: "G-X9098X90RZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

export { app, provider, auth, analytics };
