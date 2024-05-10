import app from "./firebase";
import { storage, auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

function logOutUser() {
  return new Promise((resolve, reject) => {
    signOut(auth)
      .then(() => {
        resolve("logout successfully");
      })
        .catch((error) => {
            reject(error);
        });
    });
}

function user_is_login() {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
            if(user) {
                const uid = user.uid;
                resolve(user);
            } else {
                reject("user is logged out");
            }
        });
    });
}

export { createUserWithEmailAndPassword, signInWithEmailAndPassword, logOutUser, user_is_login };