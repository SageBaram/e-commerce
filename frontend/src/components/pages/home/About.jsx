import styles from "./about.module.css";
import PropTypes from "prop-types";
import ImageLoader from "../../../utils/ImageLoader";

const About = (props) => {
	return (
		<section className={styles.about}>
			<div className={`${styles.container} ${props.wrapper}`}>
				<div className={styles.contentContainer}>
					<article>
						<header>
							BRINGING YOU THE
							<br /> <span>BEST</span> AUDIO GEAR
						</header>
						<p>
							Located at the heart of New York City, Audiophile is the premier
							store for high end headphones, earphones, speakers, and audio
							accessories. We have a large showroom and luxury demonstration
							rooms available for you to browse and experience a wide range of
							our products. Stop by our store to meet some of the fantastic
							people who make Audiophile the best place to buy your portable
							audio equipment.
						</p>
					</article>
				</div>
				<div className={styles.imageContainer}>
					<ImageLoader
						baseSrc="../../../assets/shared"
						imageName="image-best-gear.jpg"
					/>
					{/* <img src={image} alt="image best gear" /> */}
				</div>
			</div>
		</section>
	);
};

About.propTypes = {
	wrapper: PropTypes.string,
};

export default About;
