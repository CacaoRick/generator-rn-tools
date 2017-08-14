import { combineReducers } from "redux-immutable";
import main from "./main/mainReducer"

const rootReducer = combineReducers({
  main,
})

export default rootReducer
