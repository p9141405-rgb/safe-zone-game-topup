import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWvXRyAsj4ODuE2s3TYNder3F9oJi_ct8",
  authDomain: "safe-zone-topup.firebaseapp.com",
  projectId: "safe-zone-topup",
  storageBucket: "safe-zone-topup.firebasestorage.app",
  messagingSenderId: "242907263147",
  appId: "1:242907263147:web:d8ea7a03ae1edb3b2b87ee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
