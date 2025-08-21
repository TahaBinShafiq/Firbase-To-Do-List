// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDV4Oaiy13vphaJJD1GvOKUX-qlxg6YlSE",
    authDomain: "live-to-do-list.firebaseapp.com",
    projectId: "live-to-do-list",
    storageBucket: "live-to-do-list.firebasestorage.app",
    messagingSenderId: "55523599497",
    appId: "1:55523599497:web:1ace00213f9e86647ed258",
    measurementId: "G-ZQC66NFZSR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// const analytics = getAnalytics(app);


export {db , app} 