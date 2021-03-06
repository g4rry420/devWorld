import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import ReduxThunk from "redux-thunk";

import rootReducer from "./root-reducer";

const middelewares = [ReduxThunk];

if(process.env.NODE_ENV === "development"){
    middelewares.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middelewares))

export default store;