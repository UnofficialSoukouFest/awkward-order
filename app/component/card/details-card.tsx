import { Link } from "@latimeria/ganoine";
import type { ReactNode } from "react";
import baseStyles from "./card.module.css";
import styles from "./details-card.module.css";

export default function DetailsCard({ children }: { children: ReactNode }) {
	return (
		<Link href={`/menu`} className={styles.detailsCardLink}>
			<div className={`${baseStyles.cardContent} ${styles.detailsCard}`}>
				{children}
			</div>
		</Link>
	);
}
