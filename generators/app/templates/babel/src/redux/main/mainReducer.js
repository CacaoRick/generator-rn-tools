import { Record } from "immutable"
import * as ActionTypes from "../../constants/ActionTypes"

const InitialState = Record({

})

export default (state = new InitialState, action) => {
	switch (action.type) {
		// case ActionTypes.ACTION_TYPE: {
		// 	return state.setIn([""], action.payload)
		//}
		default: {
			return state
		}
	}
}
