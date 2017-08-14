import * as React from "react"
import * as ReactNative from "react-native"
import { StyleSheet, View, Text } from "react-native"

interface Props {

}

interface State {

}

export default class <%= componentName %> extends React.Component<Props, State> {
	render() {
		return (
			<View style={styles.container}>
				<Text>{"Hello <%= componentName %>"}</Text>
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
