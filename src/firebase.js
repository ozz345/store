// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbm1Wp3wiAY1Mx9dyBQ83QKN9qnnKbAEE",
  authDomain: "reactproject-d0115.firebaseapp.com",
  projectId: "reactproject-d0115",
  storageBucket: "reactproject-d0115.firebasestorage.app",
  messagingSenderId: "74231589916",
  appId: "1:74231589916:web:9c3ddba0d0b59cd8c243d9"

};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
