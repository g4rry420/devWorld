import { combineReducers } from "redux";

import userReducer from "./user/user.reducer"
import postsReducer from "./posts/posts.reducer"
import notificationsReducer from "./notifications/notifications.reducer"

export default  combineReducers({
    user: userReducer,
    posts: postsReducer,
    notifications : notificationsReducer
})