import { Link } from "react-router-dom";
import ThemeToggler from "../utils/ThemeToggler.jsx";
import Home from "../../layouts/Home.jsx";
import cartIcon from "../../assets/shared/desktop/icon-cart.svg";
import PropTypes from "prop-types";

import styles from "./navbar.module.css";

export default function Navbar(props) {
	return (
		<div className={props.wrapper}>
			<nav className={styles.navbar}>
				<section className={styles.navbarSection}>
					<Link
						className={`${styles.link} ${styles.logo} ${styles.noHover}`}
						to="/"
						element={<Home />}
					>
						audiophile
					</Link>
				</section>
				<section className={styles.navbarSection}>
					<ul>
						<li className={styles.navItem}>
							<Link className={styles.link} to="/" element={<Home />}>
								HOME
							</Link>
						</li>
						<li className={styles.navItem}>
							<Link
								className={styles.link}
								to="/headphones"
								element={<div>Headphones</div>}
							>
								HEADPHONES
							</Link>
						</li>
						<li className={styles.navItem}>
							<Link
								className={styles.link}
								to="/speakers"
								element={<div>Speakers</div>}
							>
								SPEAKERS
							</Link>
						</li>
						<li className={styles.navItem}>
							<Link
								className={styles.link}
								to="/earphones"
								element={<div>Earphones</div>}
							>
								EARPHONES
							</Link>
						</li>
					</ul>
				</section>
				<section
					className={props.hideCart ? styles.hidden : styles.navbarSection}
				>
					<ul>
						<li className={styles.navItem}>
							<ThemeToggler />
						</li>
						<li className={`${styles.cart} ${styles.navItem}`}>
							<Link
								className={`${styles.link}`}
								to="/cart"
								element={<div>Cart</div>}
							>
								<img src={cartIcon} alt="cart icon" />
							</Link>
						</li>
					</ul>
				</section>
			</nav>
		</div>
	);
}

Navbar.propTypes = {
	wrapper: PropTypes.string,
	hideCart: PropTypes.bool,
};
