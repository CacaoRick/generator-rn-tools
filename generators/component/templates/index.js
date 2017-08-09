import React from "react"
import PropTypes from "prop-types"
import { StyleSheet, View, Text } from "react-native"

export default class <%= ComponentName %> extends React.Component {
  static propTypes = {
    // prop: PropTypes.any,
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{"Hello <%= ComponentName %>"}</Text>
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