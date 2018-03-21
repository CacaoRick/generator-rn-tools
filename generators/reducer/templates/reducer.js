import { fromJS } from "immutable"
import Types from "../../constants/ActionTypes"

const InitialState = fromJS({
	
})

// TODO: Add this reducer to ../reducers

export default (state = new InitialState, action) => {
	switch (action.type) {
		// case Types.ACTION_TYPE: {
		// 	return state
		// 		.set("", fromJS(action.payload))
		// }
		// case Types.ACTION_TYPE: {
		// 	return state
		// 		.setIn(["", ""], fromJS(action.payload))
		// }
		default: {
			return state
		}
	}
}
