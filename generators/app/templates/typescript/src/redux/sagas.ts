import { all } from "redux-saga/effects"
import mainSagas from "./main/mainSaga"

export default function* rootSaga() {
	yield all([
		...mainSagas,
	])
}
