import styles from "./features.module.css";
import PropTypes from "prop-types";
import ImageLoader from "../../../utils/ImageLoader";
import ProductDetails from "../../ProductDetails";

const Features = (props) => {
	return (
		<section className={styles.features}>
			<div className={`${props.wrapper} ${styles.container}`}>
				<article className={styles.featureItem}>
					<figure>
						<ImageLoader
							imageDetails={{
								baseSrc: "../../../assets/home",
								name: "image-speaker-zx9.png",
								alt: "image speaker zx9",
							}}
						/>
						<figcaption className={styles.contentContainer}>
							<ProductDetails
								header={
									<>
										ZX9
										<br />
										SPEAKERS
									</>
								}
								content="Upgrade to premium speakers that are phenomenally built to
								deliver truly remarkable sound."
								styles={{
									customButton: {
										style: "dark",
									},
								}}
							/>
						</figcaption>
					</figure>
				</article>

				<article className={styles.featureItem}>
					<div className={styles.contentContainer}>
						<ProductDetails
							header="ZX7 SPEAKERS"
							customButton={{ style: "outline" }}
						/>
					</div>
				</article>

				<article className={styles.featureItem}>
					<ImageLoader
						baseSrc="../../../assets/home"
						imageName="image-earphones-yx1.jpg"
						alt="image earphones yx1"
					/>
					<div className={styles.contentContainer}>
						<ProductDetails
							header="YX1 EARPHONES"
							// styles={styles.contentContainer}
							customButton={{ style: "outline" }}
						/>
					</div>
				</article>
			</div>
		</section>
	);
};

Features.propTypes = {
	wrapper: PropTypes.string,
};

export default Features;
