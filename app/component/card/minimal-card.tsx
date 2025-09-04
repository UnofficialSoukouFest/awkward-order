import baseStyles from "./card.module.css";
import styles from "./minimal-card.module.css";
import { Link } from "@latimeria/ganoine";

export default function MinimalCard({
	classNumber,
	title,
}: {
	classNumber: number;
	title: string;
}) {
	return (
		<Link href={`/${classNumber}`}>
			<div className={`${styles.cardImg} ${baseStyles.cardContent}`}>
				<span>{classNumber}組</span>
				<h2 className={styles.title}>{title}</h2>
			</div>
		</Link>
	);
}
