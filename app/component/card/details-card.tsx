import type { ReactNode } from "react";
import baseStyles from "./card.module.css";
import styles from "./details-card.module.css";

export default function DetailsCard({ children }: { children: ReactNode }) {
	return (
		<div className={`${baseStyles.cardContent} ${styles.detailsCard}`}>
			{children}
		</div>
	);
}
