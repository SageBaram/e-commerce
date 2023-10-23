import Categories from "../components/pages/home/Categories";
import Features from "../components/pages/home/Features";
import About from "../components/pages/home/About";
import MainLayout from "./MainLayout";
import styles from "./home.module.css";

export default function Home() {
	return (
		<div>
			<MainLayout isHomePage={true}>
				<section className="categories">
					<Categories wrapper={styles.categoryWrapper} />
				</section>
				<section className="features">
					<Features wrapper={styles.featuresWrapper} />
				</section>
				<section className="about">
					<About wrapper={styles.aboutWrapper} />
				</section>
			</MainLayout>
		</div>
	);
}
