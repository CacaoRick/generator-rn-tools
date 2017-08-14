import createSagaMiddleware from "redux-saga"
import { Map } from "immutable"
import { createStore, applyMiddleware } from "redux"
import rootReducer from "../redux/reducer"

export default function configureStore() {
	const sagaMiddleware = createSagaMiddleware()
	return {
		...createStore(rootReducer, Map(), applyMiddleware(sagaMiddleware)),
		runSaga: sagaMiddleware.run,
	}
}
