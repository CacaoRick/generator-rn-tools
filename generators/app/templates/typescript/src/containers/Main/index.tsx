import * as React from "react"
import * as ReactNative from "react-native"
import { connect } from "react-redux"
import { StyleSheet, View, Text } from "react-native"

interface Props {

}

interface State {

}

class Main extends React.Component<Props, State> {
  render() {
    return (
      <View style={styles.container}>
        <Text>{"Hello React Native"}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
})


const mapStateToProps = (state: ImmutableState) => {
  //const { ooo } = state.get().toJS().main
  return {}
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
