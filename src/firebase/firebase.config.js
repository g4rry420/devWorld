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
      const createdAt = new Date();
    //   delete additionalData["confirmPassword"];
    //   delete additionalData["password"];
      try {
          await userRef.set({
              createdAt,
              ...additionalData
          })

      } catch (error) {
          console.log("Error while Creating User", error.message);
      }
  }
  return userRef;
}

export const posts = async (userAuth, postsData) => {
    if(!userAuth) return;

    const postsRef = firestore.collection("posts").doc();
    const snapshot = await postsRef.get();

    if(!snapshot.exists){
        const createdAt = new Date();
        const heart = 0;
        try {
            await postsRef.set({
                userId: userAuth.uid,
                createdAt,
                heart,
                displayName: userAuth.displayName,
                ...postsData
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    const heartBooleanRef = postsRef.collection("heartBoolean").doc(userAuth.uid);
    const heartBooleanRefSnapshot = await heartBooleanRef.get();

    if(!heartBooleanRefSnapshot.exists){
        const createdAt = new Date();
        const heartBoolean = false;
        try {
            await heartBooleanRef.set({
                createdAt,
                heartBoolean
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const commentsFirestore = async (commentsData) => {
    if(!commentsData) return;

    const commentsRef = firestore.collection("posts").doc(commentsData.postId).collection("comments").doc();
    const commentsRefSnapshot = commentsRef.get();

    if(!(await commentsRefSnapshot).exists){
        const createdAt = new Date();
        try {
            commentsRef.set({
                createdAt,
                ...commentsData
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();