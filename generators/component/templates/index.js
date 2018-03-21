import React from "react"
import PropTypes from "prop-types"
import { StyleSheet, View, Text } from "react-native"

export default class <%= componentName %> extends React.Component {
	static propTypes = {
		// prop: PropTypes.any,
	}

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
		alignItems: "center",
		justifyContent: "center",
	},
})
