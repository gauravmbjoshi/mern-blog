// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-gjoshi.firebaseapp.com",
  projectId: "mern-blog-gjoshi",
  storageBucket: "mern-blog-gjoshi.appspot.com",
  messagingSenderId: "679288036362",
  appId: "1:679288036362:web:ddf8d1e6b902f12cc513f3",
  measurementId: "G-TJGJEQJQKX",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
