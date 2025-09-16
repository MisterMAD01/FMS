import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8Max2xm35L_nhl9XqY6bBojXrXA41678",
  authDomain: "project-3e62b.firebaseapp.com",
  projectId: "project-3e62b",
  storageBucket: "project-3e62b.firebasestorage.app",
  messagingSenderId: "258935442314",
  appId: "1:258935442314:web:b27b1a445bd78fcc655673",
  measurementId: "G-CSRE11WHH8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
export { auth, googleProvider };
