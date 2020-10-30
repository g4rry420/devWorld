import { updateHeartBoolean } from "./posts.utils"

const INITIAL_STATE = {
    heartBoolean: [],
    posts: null,
    comments: [], 
    currentUserPosts: []
}

const postsReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case "UPDATE_POSTS": 
        return {
            ...state,
            posts: action.payload
        }
        case "UPDATE_HEART":
            return {
                ...state
            }
        case "UPDATE_HEART_BOOLEAN"  :
            return{
                ...state,
                heartBoolean: updateHeartBoolean(state.heartBoolean, action.payload, action.userAuthId, action.postId)
            } 
        case "UPDATE_HEART_BOOLEAN_ON_REDUX":
            return {
                ...state,
                heartBoolean: state.heartBoolean.map(item => {
                    return (item.postId === action.payload) ?
                            {...item, heartBoolean: !item.heartBoolean} :
                            item
                })
            }
        case "UPDATE_COMMENTS":
            return{
                ...state,
                comments: action.payload
            }
        case "CURRENT_USER_POSTS":
            return{
                ...state,
                currentUserPosts: action.payload
            }           
        default:
            return state;
    }
}

export default postsReducer