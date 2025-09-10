// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAj5xJNzdecKlfFL-bOfRVy2qL7el6V1PA",
  authDomain: "mystore-cd0a8.firebaseapp.com",
  projectId: "mystore-cd0a8",
  storageBucket: "mystore-cd0a8.firebasestorage.app",
  messagingSenderId: "291400000014",
  appId: "1:291400000014:web:39d24f8450a5f976cf125f",
  measurementId: "G-B0EMQMKVBZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
