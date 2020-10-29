import { auth, createUserProfileDocument } from "../../firebase/firebase.config"

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