import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

const config = {
    apiKey: "AIzaSyBSmixs4TnNZOCFcgiFpPKOJ5cBs74E228",
    authDomain: "devworld-e761c.firebaseapp.com",
    databaseURL: "https://devworld-e761c.firebaseio.com",
    projectId: "devworld-e761c",
    storageBucket: "devworld-e761c.appspot.com",
    messagingSenderId: "202917793886",
    appId: "1:202917793886:web:c365d18caac203d19ba4cf",
    measurementId: "G-L2MBR7KS6W"
  };
// Initialize Firebase
firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if(!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      delete additionalData["confirmPassword"];
      delete additionalData["password"];
      try {
          await userRef.set({
              displayName,
              email,
              createdAt,
              ...additionalData
          })

      } catch (error) {
          console.log("Error while Creating User", error.message);
      }
  }
  return userRef;
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();