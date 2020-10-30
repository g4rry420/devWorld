const INITIAL_STATE = {
    currentUser: null,
    profiles: []
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {

        case "SET_CURRENT_USER":
            return {
                ...state,
                currentUser: action.payload
            }
        case "SET_CURRENT_USER_LOGOUT":
            return {
                ...state,
                currentUser: action.payload
            }
        case "USER_PROFILES":
            return {
                ...state,
                profiles: action.payload
            }    
        default:
            return state;
    }
}

export default userReducer