import PropTypes from "prop-types";

function ProductDetails({ header, content, styles, customButton }) {
	const { style, innerText, imageSrc, imageAlt } = customButton;

	return (
		<article className={styles || ""}>
			<header>{header}</header>
			{content && <p>{content}</p>}
			<div role="group">
				<button className={`button ${style || ""}`}>
					{innerText || "SEE PRODUCT"}
				</button>
				{imageSrc && <img src={imageSrc} alt={imageAlt || header} />}
			</div>
		</article>
	);
}

ProductDetails.propTypes = {
	header: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	content: PropTypes.string,
	styles: PropTypes.string,
	customButton: PropTypes.shape({
		style: PropTypes.string,
		innerText: PropTypes.string,
		imageSrc: PropTypes.string,
		imageAlt: PropTypes.string,
	}),
};

export default ProductDetails;
