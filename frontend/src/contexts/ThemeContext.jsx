import React from "react";
import PropTypes from "prop-types";

const ThemeContext = React.createContext();

export default ThemeContext;

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = React.useState("light");

	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

ThemeProvider.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
};
