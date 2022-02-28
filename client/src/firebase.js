import * as firebase from "firebase"

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRcPTI2PGs7-YTNcUO5o9bKFj7A-A7GBc",
  authDomain: "ecommerce-7cec5.firebaseapp.com",
  projectId: "ecommerce-7cec5",
  storageBucket: "ecommerce-7cec5.appspot.com",
  messagingSenderId: "1061598348399",
  appId: "1:1061598348399:web:8fe19f6e5e5aefbf5df99a",
  measurementId: "G-PCTH70NR3S"
};
  
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);
export const auth = firebase.auth();
//export const googleAuthProvider = new firebase.auth.googleAuthProvider();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// Initialize Firebase
//const analytics = getAnalytics(app);