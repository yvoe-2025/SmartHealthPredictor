import { initializeApp } from "firebase/app";
import { 
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA8JmqKtgdb5BUWVsfqrZYiyKnALx9rb7E",
  authDomain: "smart-health-prediction-acd6f.firebaseapp.com",
  projectId: "smart-health-prediction-acd6f",
  storageBucket: "smart-health-prediction-acd6f.appspot.com",
  messagingSenderId: "1082594120143",
  appId: "1:1082594120143:web:0baddb2a34d67ec71f02ba",
  measurementId: "G-37PQVMQ3Y0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { 
  auth,
  db,
  googleProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
};