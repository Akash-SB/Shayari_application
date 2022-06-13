// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXVGpqlGHbxfbl2vuwO1qopEqLrPpp0U0",
  authDomain: "shayari-app-195a6.firebaseapp.com",
  projectId: "shayari-app-195a6",
  storageBucket: "shayari-app-195a6.appspot.com",
  messagingSenderId: "1028934191618",
  appId: "1:1028934191618:web:d3c2062bb3a20d6d12f51b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const storage = getStorage(app);