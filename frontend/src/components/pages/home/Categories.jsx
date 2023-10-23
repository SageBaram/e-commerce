import CategoryItem from "../../common/CategoryItem";
import styles from "./categories.module.css";
import PropTypes from "prop-types";

export default function Categories(props) {
	const baseSrc = "../../../assets/shared";

	return (
		<section className={styles.categories}>
			<div className={`${props.wrapper}`}>
				<div className={styles.container}>
					<article className="category-box">
						<div className={styles.wrapper}>
							<CategoryItem
								category="HEADPHONES"
								baseImgSrc={baseSrc}
							></CategoryItem>
						</div>
					</article>
					<article className="category-box">
						<div className={styles.wrapper}>
							<CategoryItem
								category="SPEAKERS"
								baseImgSrc={baseSrc}
							></CategoryItem>
						</div>
					</article>
					<article className="category-box">
						<div className={styles.wrapper}>
							<CategoryItem
								category="EARPHONES"
								baseImgSrc={baseSrc}
							></CategoryItem>
						</div>
					</article>
				</div>
			</div>
		</section>
	);
}

Categories.propTypes = {
	wrapper: PropTypes.string,
};
