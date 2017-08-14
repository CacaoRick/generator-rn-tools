import { combineReducers } from "redux-immutable";
import main from "./main/mainReducer"

export default combineReducers({
	main: main,
})
