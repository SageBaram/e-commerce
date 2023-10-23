import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import Hero from "../components/pages/home/Hero";
import PropTypes from "prop-types";
import { useContext } from "react";
import ThemeContext from "../contexts/ThemeContext";
import styles from "./mainlayout.module.css";

export default function MainLayout({ children, isHomePage }) {
	const { theme } = useContext(ThemeContext);
	return (
		<div className={theme}>
			<div className={styles.container}>
				<header className={styles.header}>
					<Navbar wrapper={styles.navbarWrapper} />
					{isHomePage && (
						<>
							<hr className={styles.headerHr} />
							<Hero />
						</>
					)}
				</header>
				<main>{children}</main>
				<footer>
					<Footer wrapper={styles.footerWrapper} />
				</footer>
			</div>
		</div>
	);
}

MainLayout.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
	isHomePage: PropTypes.bool,
};
