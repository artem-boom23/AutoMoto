import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAXcrgViz27hDvd1zYuU1sPbB_KbScNAWk",
    authDomain: "cars-de0c1.firebaseapp.com",
    projectId: "cars-de0c1",
    storageBucket: "cars-de0c1.appspot.com",
    messagingSenderId: "870903689706",
    appId: "1:870903689706:web:63a2b28a1cb17891bac293"
};


// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
