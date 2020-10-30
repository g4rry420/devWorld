import { firestore } from "../../firebase/firebase.config"
import firebase from "firebase/app"
import "firebase/firestore"

export const updatePosts = posts => ({
    type: "UPDATE_POSTS",
    payload: posts
})

export const updatePostAsync = () => {
    return dispatch => {
        const unsubscribe = firestore.collection("posts").orderBy("createdAt", "desc").onSnapshot( querySnapshot => {
            let docArray = [];
            let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
            querySnapshot.forEach(doc => {
                const { createdAt, title, link, heart, content, userId, displayName } = doc.data();
                docArray.push({ id: doc.id, 
                    time: createdAt.toDate().getHours() + ":" + createdAt.toDate().getMinutes(),
                    date: createdAt.toDate().getDate() + " " + months[createdAt.toDate().getMonth()] + " " + createdAt.toDate().getFullYear(),
                    title, link, heart, content, userId, displayName: displayName.split(" ").map(word => word[0].toUpperCase() + word.substr(1)).join(" ")
                })
            })
            dispatch(updatePosts(docArray))
        })

        return () => unsubscribe();
    }
}

export const updateHeart = () => ({
    type: "UPDATE_HEART"
})

export const updateHeartAsync = (postId, heartBoolean, userAuthId) => {
    return async dispatch => {
        const postsRef = firestore.collection("posts").doc(postId);
        const snapshot = await postsRef.get();

        const heartBooleanRef = firestore.collection("posts").doc(postId).collection("heartBoolean").doc(userAuthId);


        if(snapshot.exists && heartBoolean === false){
            await postsRef.update({
                heart: firebase.firestore.FieldValue.increment(1)
                
            })
            .then(() => {
                dispatch(updateHeart); 
            })
                .catch((error) => console.log(error))  

            await heartBooleanRef.update({
                    heartBoolean: true
                    })   

        }else if(snapshot.exists && heartBoolean === true){
            await postsRef.update({
                heart: firebase.firestore.FieldValue.increment(-1)
            })
            .then(() => {
                dispatch(updateHeart);
            })
                .catch((error) => console.log(error))   
             
            await heartBooleanRef.update({
                    heartBoolean: false
                })
        }
    }
}

export const updateHeartBoolean = (heartBoolean, userAuthId, postId) => ({
    type: "UPDATE_HEART_BOOLEAN", 
    payload: heartBoolean,
    userAuthId, postId
});
export const updateHeartBooleanAsync = (postId, userAuthId) => {
    return async dispatch => {
        const heartBooleanRef = firestore.collection("posts").doc(postId).collection("heartBoolean").doc(userAuthId);

        await heartBooleanRef.get().then(doc => {
            if(doc.exists){
                dispatch(updateHeartBoolean(doc.data().heartBoolean, userAuthId, postId))
            }
            else if(!doc.exists){
                const createdAt = new Date();
                heartBooleanRef.set({
                    heartBoolean: false,
                    createdAt
                }).then(async () => {
                    await heartBooleanRef.get().then(doc => {
                        if(doc.exists){
                            dispatch(updateHeartBoolean(doc.data().heartBoolean, userAuthId, postId))
                        }
                    })
                })
            }
        }).catch((error) => console.log(error))
    }
}

export const updateHeartBooleanOnRedux = (postId) => ({
    type: "UPDATE_HEART_BOOLEAN_ON_REDUX",
    payload: postId
})

export const updateComments = (comments) => ({
    type: "UPDATE_COMMENTS",
    payload: comments
})

export const updateCommentsAsync = postId => {
    return dispatch => {

        const unsubscribe  = firestore.collection("posts").doc(postId).collection("comments").onSnapshot(querySnapshot => {
            let docArray = [];
            let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
            querySnapshot.forEach(doc => {
                const { createdAt, comment, postId, displayName } = doc.data();
                docArray.push({ id: doc.id, 
                    time: createdAt.toDate().getHours() + ":" + createdAt.toDate().getMinutes(),
                    date: createdAt.toDate().getDate() + " " + months[createdAt.toDate().getMonth()] + " " + createdAt.toDate().getFullYear(),
                    comment,postId, displayName: displayName.split(" ").map(word => word[0].toUpperCase() + word.substr(1)).join(" ")
                })
            })
            dispatch(updateComments(docArray));
        })
        return () => unsubscribe();
    }
}

export const currentUserPosts = post => ({
    type: "CURRENT_USER_POSTS",
    payload: post
})

export const currentUserPostsAsync = currentUserId => {
    return dispatch => {
        
        const unsubscribe = firestore.collection("posts").where("userId", "==", currentUserId ).onSnapshot( querySnapshot => {
            let docArray = [];
            let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
            querySnapshot.forEach(doc => {
                const { createdAt, title, link, heart, content, userId, displayName } = doc.data();
                docArray.push({
                    id: doc.id, 
                    time: createdAt.toDate().getHours() + ":" + createdAt.toDate().getMinutes(),
                    date: createdAt.toDate().getDate() + " " + months[createdAt.toDate().getMonth()] + " " + createdAt.toDate().getFullYear(),
                    title, link, heart, content, userId, displayName: displayName.split(" ").map(word => word[0].toUpperCase() + word.substr(1)).join(" ")
                })
            })
            dispatch(currentUserPosts(docArray))
        })

        return () => unsubscribe();
    }
}