import { Outlet } from "react-router";
import styles from "./layout.module.css";

export default function layout() {
	return (
		<main className={styles.mainLayout}>
			<Outlet />
		</main>
	);
}
