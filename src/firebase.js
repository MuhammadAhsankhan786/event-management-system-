import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD7OxUqrZ7_4IzudKsR71XAucTgtZmYSz0",
  authDomain: "event-management-29e30.firebaseapp.com",
  projectId: "event-management-29e30",
  storageBucket: "event-management-29e30.firebasestorage.app",
  messagingSenderId: "130670650775",
  appId: "1:130670650775:web:210d8aa63677a766c610d2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export { app };
