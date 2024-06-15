// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9Bqk_s1Q69u1jg8cx5lKnhocYnRLfkEs",
  authDomain: "five-diamond-d1240.firebaseapp.com",
  projectId: "five-diamond-d1240",
  storageBucket: "five-diamond-d1240.appspot.com",
  messagingSenderId: "400498818635",
  appId: "1:400498818635:web:089cfad380cf4b83e717ce",
  measurementId: "G-VRFNMMFY0V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const provider = new GoogleAuthProvider();

export const auth = getAuth();
export const storage = getStorage();
// To apply the default browser preference instead of explicitly setting it.
// auth.useDeviceLanguage();
