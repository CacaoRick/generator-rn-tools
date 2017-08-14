import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { StyleSheet, View, Text } from "react-native"

class Main extends React.Component {
	static propTypes = {
		// prop: PropTypes.any,
	}

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


const mapStateToProps = (state) => {
	//const { } = state.get().toJS()
	return {}
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
