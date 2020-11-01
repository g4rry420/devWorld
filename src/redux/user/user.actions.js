import { auth, createUserProfileDocument, firestore } from "../../firebase/firebase.config"
import { notification } from "../notifications/notifications.actions"

export const setCurrentUser = user => ({
    type: "SET_CURRENT_USER",
    payload: user
})
export const setCurrentUserAsync = () => {
    return dispatch => {
        const unsubcribe = auth.onAuthStateChanged(async userAuth => {
            if(userAuth) {
                const userRef = await createUserProfileDocument(userAuth);
 
                userRef.onSnapshot(snapshot => {
                    dispatch(setCurrentUser({
                        uid: snapshot.id,
                        ...snapshot.data()
                    }))
                })
            }
        })

        return () => {
            unsubcribe();
        }
    }
}

export const setCurrentUserLogout = user => ({
    type: "SET_CURRENT_USER_LOGOUT",
    payload: user
})

export const userProfiles = profiles => ({
    type: "USER_PROFILES",
    payload: profiles
})

export const userProfilesAsync = () => {
    return dispatch => {

        const unsubscribe = firestore.collection("users").onSnapshot(querySnapshot => {

            let docArray = [];
            let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
            querySnapshot.forEach(doc => {
                const { aboutYou, createdAt, displayName, email, github, instagram, linkedIn, portfolio, role, techStack, twitter } = doc.data();
                docArray.push({ uid: doc.id,
                    time: createdAt.toDate().getHours() + ":" + createdAt.toDate().getMinutes(),
                    date: createdAt.toDate().getDate() + " " + months[createdAt.toDate().getMonth()] + " " + createdAt.toDate().getFullYear(),
                    aboutYou, displayName, email, github, instagram, linkedIn, portfolio, role, techStack, twitter, createdAt
                })
            })
            dispatch(userProfiles(docArray))
            dispatch(notification(docArray))
        })

        return () => unsubscribe();
    }
}

export const currentUserDependency = () => ({
    type: "CURRENT_USER_DEPENDENCY"
})