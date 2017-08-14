import { takeEvery, fork, select, put } from "redux-saga/effects"
import * as actions from "./mainActions"

export default [
	fork(watchXxx),
]

export function* watchXxx() {
	// yield takeEvery(actions.xxx.type, xxxFlow)
}

// function* loginFlow(action) {
	// const state: ImmutableState = yield select()
	// const { ooo } = state.toJS().main
	
// }
