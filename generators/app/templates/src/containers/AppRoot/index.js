import React from "react"
import Immutable from "immutable"
import ReduxThunk from "redux-thunk"
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import AppRouter from "../AppRouter"
import reducers from "../../redux/reducers"

export default class AppRoot extends React.Component {
  render() {
    const store = createStore(reducers, Immutable.Map(), applyMiddleware(ReduxThunk))
    return (
      <Provider store={store}>
        <AppRouter />
      </Provider>
    )
  }
}