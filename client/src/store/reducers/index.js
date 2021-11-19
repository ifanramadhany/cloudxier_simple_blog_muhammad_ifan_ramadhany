import { combineReducers } from "redux";
import blogReducer from "./blogReducer"

const reducers = combineReducers({
  blogState: blogReducer
})

export default reducers;