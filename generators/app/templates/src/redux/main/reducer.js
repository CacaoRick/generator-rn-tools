import { fromJS } from "immutable"
import Types from "../../constants/ActionTypes"

const initialState = fromJS({
	
})

export default (state = initialState, action) => {
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
