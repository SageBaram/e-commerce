import PropTypes from "prop-types";
import styles from "./categoryitem.module.css";
import arrowImage from "../../assets/shared/desktop/icon-arrow-right.svg";
import ImageLoader from "../../utils/ImageLoader";
import ProductDetails from "../ProductDetails";

export default function CategoryItem(props) {
	const imageName = props.category.toLowerCase();
	return (
		<figure className={styles.categoryItem}>
			<ImageLoader
				baseSrc={props.baseImgSrc}
				imageName={`image-category-thumbnail-${imageName}.png`}
				alt={props.alt}
				imgStyle={styles.categoryItemImage}
				onlyDesktop={true}
			/>
			<figcaption>
				<ProductDetails
					header={props.category}
					styles={{
						customButton: {
							style: `${styles.shop} transparent`,
							imageSrc: { arrowImage },
							imageAlt: "arrow button image",
						},
					}}
				/>
			</figcaption>
		</figure>
	);
}

CategoryItem.propTypes = {
	category: PropTypes.string,
	baseImgSrc: PropTypes.string,
	alt: PropTypes.string,
};
