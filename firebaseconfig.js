// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNcD9mC8wjPC0ofBOQ28eEYb8Edlfqw4c",
  authDomain: "tinder-ff594.firebaseapp.com",
  projectId: "tinder-ff594",
  storageBucket: "tinder-ff594.appspot.com",
  messagingSenderId: "412697858316",
  appId: "1:412697858316:web:5e6360702668e1a6387929",
  measurementId: "G-NHDBC028H1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);