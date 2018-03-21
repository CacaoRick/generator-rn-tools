import { combineReducers } from "redux-immutable"
import main from "./main/reducer"

const rootReducer = combineReducers({
	main,
})

export default rootReducer
