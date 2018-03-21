import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Router, Scene } from "react-native-router-flux"
import Main from "../Main"

class AppRouter extends React.Component {
	render() {
		return (
			<Router>
				<Scene key="root">
					<Scene key="Main" component={Main} initial />
				</Scene>
			</Router>
		)
	}
}
const mapStateToProps = (state) => {
	
	return {}
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter)
