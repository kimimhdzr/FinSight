// purpose: nak upload gambar ke firebase

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTRlaLlUx7G_fLlRhnyf_elfYHMkTSMl0",
  authDomain: "finsight-image-upload.firebaseapp.com",
  projectId: "finsight-image-upload",
  storageBucket: "finsight-image-upload.firebasestorage.app",
  messagingSenderId: "1077590449934",
  appId: "1:1077590449934:web:41b301f62c71d0db5e815f",
  measurementId: "G-H6KL87SQ6N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { app, storage };