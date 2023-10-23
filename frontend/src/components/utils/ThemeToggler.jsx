import { useContext } from "react";
import ThemeContext from "../../contexts/ThemeContext.jsx";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
const ThemeToggler = () => {
	const { theme, toggleTheme } = useContext(ThemeContext);

	return (
			<button onClick={toggleTheme}>
				{theme === `light` ? <MdDarkMode size={20}/> : <CiLight size={20}/>}
			</button>
	);
};

export default ThemeToggler;
