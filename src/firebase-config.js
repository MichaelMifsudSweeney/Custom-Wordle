import { initializeApp } from 'firebase/app';
import { getFirestore, getDocs } from '@firebase/firestore';
import { doc, getDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "custom-wordle-6ab39.firebaseapp.com",
    projectId: "custom-wordle-6ab39",
    storageBucket: "custom-wordle-6ab39.appspot.com",
    messagingSenderId: "782586744915",
    appId: "1:782586744915:web:3a197ac37ce018f05936a6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);



