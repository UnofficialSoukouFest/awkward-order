import type { ReactNode } from "react";
import baseStyles from "./card.module.css";
import styles from "./details-card.module.css";
import { Link } from "@latimeria/ganoine";

export default function DetailsCard({ children }: { children: ReactNode }) {
	return (
		<Link href={`/menu`}>
			<div className={`${baseStyles.cardContent} ${styles.detailsCard}`}>
				{children}
			</div>
		</Link>
	);
}
