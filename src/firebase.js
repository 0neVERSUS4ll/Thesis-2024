import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyB_cFh9Y8LxjQgG0wcPaWDKNTeQStp48Nc",
  authDomain: "testo2-a866c.firebaseapp.com",
  databaseURL: "https://testo2-a866c-default-rtdb.firebaseio.com",
  projectId: "testo2-a866c",
  storageBucket: "testo2-a866c.appspot.com",
  messagingSenderId: "114286902007",
  appId: "1:114286902007:web:2ac9d15f7fc1e5ee2f31f2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
export default app;
