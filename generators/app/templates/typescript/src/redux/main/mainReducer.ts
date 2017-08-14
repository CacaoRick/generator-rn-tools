import { Action } from "redux"
import { Record } from "immutable"
import { isType } from "typescript-fsa"
import * as actions from "./mainActions"

const INITIAL_STATE = Record({

})

export default (state = new INITIAL_STATE(), action: Action) => {
	// if (isType(action, actions.xxx)) {
	// 	return state.merge(action.payload.ooo)
	// }

	return state
}
