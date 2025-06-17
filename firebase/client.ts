// Import the functions you need from the SDKs you need
import { initializeApp,getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAztYm8_RQsp5seEwHQ5s58dnBum5SjNnc",
  authDomain: "learnprep-c89c4.firebaseapp.com",
  projectId: "learnprep-c89c4",
  storageBucket: "learnprep-c89c4.firebasestorage.app",
  messagingSenderId: "107315175525",
  appId: "1:107315175525:web:292c80cf9d34730f9b268c",
  measurementId: "G-QZEJ6L63MW"
};

const app =!getApps.length? initializeApp(firebaseConfig):getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);