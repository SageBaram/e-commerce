import Navbar from "./Navbar";
import styles from "./footer.module.css";
import PropTypes from "prop-types";
import fbIcon from "../../assets/shared/desktop/icon-facebook.svg";
import instaIcon from "../../assets/shared/desktop/icon-instagram.svg";
import twitterIcon from "../../assets/shared/desktop/icon-twitter.svg";

export default function Footer(props) {
	return (
		<footer className={styles.footer}>
			<div className={props.wrapper}>
				<Navbar hideCart={true} />
				<div className={styles.contentContainer}>
					<div className={styles.text}>
						<p>
							Audiophile is an all in one stop to fulfill your audio needs.
							We&apos;re a small team of music lovers and sound specialists who
							are devoted to helping you get the most out of personal audio.
							Come and visit our demo facility - we’re open 7 days a week.
						</p>
						<p>Copyright 2021. All rights reserved.</p>
					</div>

					<div className={styles.socials}>
						<ul role="list">
							<li>
								<a href="https://www.facebook.com">
									<img src={fbIcon} alt="facebook icon" />
								</a>
							</li>
							<li>
								<a href="https://www.twitter.com">
									<img src={twitterIcon} alt="twitter icon" />
								</a>
							</li>
							<li>
								<a href="https://www.instagram.com">
									<img src={instaIcon} alt="instagram icon" />
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
}

Footer.propTypes = {
	wrapper: PropTypes.string,
};
