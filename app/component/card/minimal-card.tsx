import baseStyles from "./card.module.css";
import styles from "./minimal-card.module.css";

export default function MinimalCard({
	classNumber,
	title,
}: {
	classNumber: number;
	title: string;
}) {
	return (
		<div className={`${styles.cardImg} ${baseStyles.cardContent}`}>
			<span>{classNumber}組</span>
			<h2>{title}</h2>
		</div>
	);
}
