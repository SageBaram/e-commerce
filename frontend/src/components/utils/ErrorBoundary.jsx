/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
// import Logger from "../../../../shared/src/utils/Logger";

class ErrorBoundary extends React.Component {
	state = {
		hasError: false,
		errorMessage: "",
	};

	static defaultProps = {
		fallback: <div>Something went wrong.</div>,
	};

	static getDerivedStateFromError(error) {
		return { hasError: true };
	}

	componentDidCatch(error, info) {
		this.setState({
			errorMessage: "Something went wrong.",
		});
		// Logger.error(
		// 	`Error: ${error}, Info: ${info}, Message: ${this.state.errorMessage}`,
		// );
	}

	render() {
		if (this.state.hasError) {
			return <div>{this.state.errorMessage}</div>;
		}
		return this.props.children;
	}
}

ErrorBoundary.propTypes = {
	fallback: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
		.isRequired,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
};

export default ErrorBoundary;
