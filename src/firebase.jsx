// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-dRCR45JWEYQBhVkVZcoaI5UQbmU-4Qs",
  authDomain: "kenie-26af6.firebaseapp.com",
  projectId: "kenie-26af6",
  storageBucket: "kenie-26af6.appspot.com",
  messagingSenderId: "794095400457",
  appId: "1:794095400457:web:f0005f0728585ef586ead8",
  measurementId: "G-Q31RV6DET5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const notesCollection = collection(db, "notes")