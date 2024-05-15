import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
 apiKey: "AIzaSyDrzBP3zJAaFpD6vZ5fbkzOnfX2H-LsUO8",
 authDomain: "just-dev-8bded.firebaseapp.com",
 projectId: "just-dev-8bded",
 storageBucket: "just-dev-8bded.appspot.com",
 messagingSenderId: "587198086423",
 appId: "1:587198086423:web:5bb8d940f846d5ae8e4b52",
 measurementId: "G-M4MD6PMQYR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { fireDB, auth, storage };
