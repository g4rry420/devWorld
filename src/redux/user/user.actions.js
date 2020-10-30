import { auth, createUserProfileDocument, firestore } from "../../firebase/firebase.config"

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
            querySnapshot.forEach(doc => {
                docArray.push({ uid: doc.id, ...doc.data() })
            })
            dispatch(userProfiles(docArray))
        })

        return () => unsubscribe();
    }
}