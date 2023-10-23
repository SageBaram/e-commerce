import PropTypes from "prop-types";
import { viewports } from "../constants/viewports";


function ImageLoader({ imageDetails, onlyDesktop, imgStyle }) {
	const className = imgStyle || "";
	const { baseSrc, name, alt } = imageDetails || "";

	return (
		<picture>
			{viewports.map((item) => {
				if (onlyDesktop && item.viewport !== "desktop") return null;
				return (
					<Source
						key={item.viewport}
						media={item.media}
						viewport={item.viewport}
						imageDetails={imageDetails}
					/>
				);
			})}
			<img
				className={className}
				src={getSrcSet(baseSrc, onlyDesktop ? "desktop" : "mobile", name)}
				alt={alt || "image"}
			/>
		</picture>
	);
}

function Source({ media, viewport, imageDetails }) {
	const { baseSrc, name } = imageDetails;
	return <source media={media} srcSet={getSrcSet(baseSrc, viewport, name)} />;
}

function getSrcSet(baseSrc, viewport, imageName) {
	return `${baseSrc}/${viewport}/${imageName}`;
}


ImageLoader.propTypes = {
	imageDetails: PropTypes.shape({
		baseSrc: PropTypes.string,
		name: PropTypes.string,
		alt: PropTypes.string,
	}).isRequired,
	onlyDesktop: PropTypes.bool,
	imgStyle: PropTypes.string,
};

Source.propTypes = {
	media: PropTypes.string.isRequired,
	viewport: PropTypes.string.isRequired,
	imageDetails: PropTypes.shape({
		baseSrc: PropTypes.string,
		name: PropTypes.string,
		alt: PropTypes.string,
	}).isRequired,
};

export default ImageLoader;
