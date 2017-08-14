import * as React from "react"
import { Provider } from "react-redux"
import AppRouter from "../AppRouter"
import rootSaga from "../../redux/sagas"
import configureStore from "../../lib/configureStore"

export default class AppRoot extends React.Component {
  render() {
    const store = configureStore()
    store.runSaga(rootSaga)
    
    return (
      <Provider store={store}>
        <AppRouter />
      </Provider>
    )
  }
}
