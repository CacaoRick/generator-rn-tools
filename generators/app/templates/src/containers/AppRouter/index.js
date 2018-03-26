import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { StyleSheet, Platform } from "react-native"
import { Router, Scene } from "react-native-router-flux"
import Main from "../Main"

class AppRouter extends React.Component {
	render() {
		return (
			<Router>
				<Scene key="root" style={styles.paddingNavBar}>
					<Scene key="Main" component={Main} title="Main" initial />
				</Scene>
			</Router>
		)
	}
}

const styles = StyleSheet.create({
	paddingNavBar: {
		paddingTop: Platform.select({
			ios: 64,
			android: 54,
		}),
	},
})


const mapStateToProps = (state) => {
	
	return {}
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter)
