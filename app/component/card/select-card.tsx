import { useState } from "react";
import styles from "./select-card.module.css";

export function SelectCard() {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div className={styles.card}>
			<div className={styles.main}>
				<img alt="商品の画像です" />
				<div className={styles.menuPrice}>
					<p className={styles.menu}>商品名＊＊＊＊</p>
					<p className={styles.price}>¥100</p>
				</div>
			</div>
			{isOpen ? (
				<>
					<button onClick={() => setIsOpen(false)} type="button">
						表示を折りたたむ
					</button>
					<div className={styles.ingredients}>
						<div className={styles.allergen}>
							<h3>特定原材料28品目</h3>
							<p>特定原材料＊＊＊＊＊＊</p>
						</div>
						<div className={styles.otherIngredients}>
							<h3>原材料</h3>
							<p>原材料＊＊＊＊＊＊＊＊</p>
						</div>
					</div>
				</>
			) : (
				<button onClick={() => setIsOpen(true)} type="button">
					原材料・アレルゲンを表示
				</button>
			)}
		</div>
	);
}

export function SelectCardPick() {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div className={styles.card}>
			<div className={styles.main}>
				<div className={styles.picture}>
					<p className={styles.express}>激推し</p>
					<img alt="商品の画像です" />
				</div>
				<div className={styles.menuPrice}>
					<p className={styles.menu}>商品名＊＊＊＊</p>
					<p className={styles.price}>¥100</p>
				</div>
			</div>
			{isOpen ? (
				<>
					<button onClick={() => setIsOpen(false)} type="button">
						表示を折りたたむ
					</button>
					<div className={styles.ingredients}>
						<div className={styles.allergen}>
							<h3>特定原材料28品目</h3>
							<p>特定原材料＊＊＊＊＊＊</p>
						</div>
						<div className={styles.otherIngredients}>
							<h3>原材料</h3>
							<p>原材料＊＊＊＊＊＊＊＊</p>
						</div>
					</div>
				</>
			) : (
				<button onClick={() => setIsOpen(true)} type="button">
					原材料・アレルゲンを表示
				</button>
			)}
		</div>
	);
}
