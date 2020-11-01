import { notification } from "./notifications.utils"

const INITIAL_STATE = {
    notification: []
}

const notificationsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "USER_AND_POST_NOTIFICATION":
            return {
                ...state,
                notification: notification(state.notification, ...action.payload)
            }
    
        default:
            return {
                ...state
            }
    }
}

export default notificationsReducer