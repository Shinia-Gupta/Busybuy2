// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth,GoogleAuthProvider} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: process.env.REACT_APP_API_KEY,
  // authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_APP_ID
  apiKey: "AIzaSyDVJEHywJsQ81oZcap72Sj3TNR2nA4dCnE",
  authDomain: "busybuy2-bd499.firebaseapp.com",
  projectId: "busybuy2-bd499",
  storageBucket: "busybuy2-bd499.appspot.com",
  messagingSenderId: "421790298919",
  appId: "1:421790298919:web:92bbab4e1b5f2e2b5e2f02"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//firebase instance
const firebaseAuth=getAuth(app);

//initialize firestore db and get a reference to that service
const db = getFirestore(app);

//instance of google auth provider
const googleProvider=new GoogleAuthProvider();

export {db,firebaseAuth,googleProvider};
