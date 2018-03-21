import React from "react"
import Immutable from "immutable"
import ReduxThunk from "redux-thunk"
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import AppRoot from "./src/containers/AppRoot"
import reducers from "./src/redux/reducers"

export default class App extends React.Component {
	render() {
		const store = createStore(reducers, Immutable.Map(), applyMiddleware(ReduxThunk))

		return (
			<Provider store={store}>
				<AppRoot />
			</Provider>
		)
	}
}
