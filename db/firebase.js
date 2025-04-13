// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQqaZAghS7664mOKeUpLo2-Xyj7XaPQUM",
  authDomain: "ambatrondb.firebaseapp.com",
  databaseURL: "https://ambatrondb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ambatrondb",
  storageBucket: "ambatrondb.firebasestorage.app",
  messagingSenderId: "300869777493",
  appId: "1:300869777493:web:505fa59b8f4d812e0f7cdc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);