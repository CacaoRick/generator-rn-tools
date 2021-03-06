import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { StyleSheet, View, Text } from "react-native"
import actions from "../../redux/actions"

class <%= containerName %> extends React.Component {
	static propTypes = {
		// prop: PropTypes.any,
	}

	render() {
		return (
			<View style={styles.container}>
				<Text>{"Hello <%= containerName %>"}</Text>
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
	return {
		// data: state.getIn(["reducer", "data"]),
	}
}

const mapDispatchToProps = {
	// action: actions.action,
}

export default connect(mapStateToProps, mapDispatchToProps)(<%= containerName %>)
