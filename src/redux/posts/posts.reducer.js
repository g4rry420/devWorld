import { updateHeartBoolean } from "./posts.utils"

const INITIAL_STATE = {
    heartBoolean: [],
    posts: null,
    waitTime: false
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
        case "DISPATCH_WAIT_TIME":
            return {
                ...state,
                waitTime: !state.waitTime
            }    
        default:
            return state;
    }
}

export default postsReducer