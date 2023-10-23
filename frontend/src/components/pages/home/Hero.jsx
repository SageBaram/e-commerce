import styles from "./hero.module.css";
import { useEffect, useRef } from "react";
import heroImage from "../../../assets/home/desktop/image-hero.jpg";
import ProductDetails from "../../ProductDetails";

function Hero() {
	const innerContainerRef = useRef(null);

	useEffect(() => {
		const img = new Image();
		img.src = heroImage;

		img.onload = function() {
			if (innerContainerRef.current) {
				const paddingTop = (this.height / this.width) * 100;
				innerContainerRef.current.style.paddingTop = `${paddingTop}%`;
			}
		};
	}, []);

	return (
		<section>
			<div className={styles.bgImageContainer}>
				<div className={styles.innerContainer} ref={innerContainerRef}>
					<div className={styles.contentContainer}>
						<div>
							<span>NEW PRODUCT</span>
						</div>
						<ProductDetails
							header={
								<>
									XX99 MARK II <br />
									HEADPHONES
								</>
							}
							content="Experience natural, lifelike audio and exceptional build quality
							made for the passionate music enthusiast."
						// customButton={{ style: "primary", innerText: "SEE PRODUCT" }}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Hero;
