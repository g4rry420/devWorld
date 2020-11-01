const INITIAL_STATE = {
    currentUser: null,
    profiles: [],
    currentUserDependency: true,
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
        case "CURRENT_USER_DEPENDENCY":
            return {
                ...state,
                currentUserDependency: !state.currentUserDependency
            }            
        default:
            return state;
    }
}

export default userReducer