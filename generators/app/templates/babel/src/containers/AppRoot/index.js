import React from "react"
import { connect } from "react-redux"
import AppRouter from "../AppRouter"

class AppRoot extends React.Component {
	render() {
		return (
			<AppRouter />
		)
	}
}

const mapStateToProps = (state) => {

	return {}
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(AppRoot)
