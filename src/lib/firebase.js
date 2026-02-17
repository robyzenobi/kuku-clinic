import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCtGVKzMDkAvQzkwrifwgob7wN4pAtDckc",
    authDomain: "kuku-clinic.firebaseapp.com",
    projectId: "kuku-clinic",
    storageBucket: "kuku-clinic.firebasestorage.app",
    messagingSenderId: "391814855091",
    appId: "1:391814855091:web:2c26767c364cec20b533c6",
    measurementId: "G-8CY5QTTHD8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export { analytics };
