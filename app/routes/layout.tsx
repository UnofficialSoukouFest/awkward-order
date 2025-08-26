import { Outlet } from "react-router";
import styles from "./layout.module.css";

export default function Layout() {
	return (
		<main className={styles.mainLayout}>
			<Outlet />
		</main>
	);
}
