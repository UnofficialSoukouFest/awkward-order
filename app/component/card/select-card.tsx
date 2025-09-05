import { useState } from "react";
import Image from "~/component/image";
import styles from "./select-card.module.css";
import { productFactory } from "workers/seed";

export type DisplayType = {
	name: string;
	price: number;
	classId: number;
	allergens: string[];
	mayContainAllergens: string[];
	Ingredients: string;
};

export type SelectType = {
	product: DisplayType;
};

export function SelectCard({ product }: SelectType) {
	// product => productData
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div className={styles.card}>
			<div className={styles.main}>
				<div className={styles.productImage}>
					<img alt="商品の画像です。" />
					{product.isFavorite && <span className={styles.express}>激推し</span>}
					<svg
						className={styles.decoration_ul}
						style={{
							fill: "var(--themecolor-main)",
							color: "var(--semantic-text-dark)",
						}}
						width="74"
						height="43"
						viewBox="0 5 74 43"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M0.126953 4.12342C0.126953 1.91428 1.91781 0.123413 4.12695 0.123413H73.9236C73.9236 0.123413 57.587 2.37017 53.6436 15.289C49.7003 28.2078 41.8136 31.0163 33.927 31.0163C26.0403 31.0163 16.4636 26.5228 10.267 28.7695C4.07029 31.0163 2.38029 34.9481 0.126953 42.25V4.12342Z" />
					</svg>
					<svg
						className={styles.decoration_dr}
						style={{ fill: "var(--themecolor-main)" }}
						width="51"
						height="44"
						viewBox="0 -10 51 44"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M51 43.8702L51 0.0584219C43.6767 14.6623 45.3667 24.211 36.3534 29.2662C27.34 34.3214 16.6843 20.6551 0.30003 43.8702L30.4383 43.8702L51 43.8702Z" />
					</svg>
				</div>
				<div className={styles.menuPrice}>
					<p className={styles.menu}>{product.name}</p>
					<div className={styles.bottom}>
						<p className={styles.price}>
							<span className={styles.priceUnit}>￥</span>
							{product.price}
						</p>
						<button onClick={() => setIsOpen((isOpen) => !isOpen)}>
							{isOpen ? "表示を折り畳む" : "原材料・アレルゲンを表示"}
						</button>
					</div>
				</div>
			</div>
			{isOpen && (
				<div className={styles.ingredients}>
					<div className={styles.allergen}>
						<h3>特定原材料28品目</h3>
						<p>{product.allergens}</p>
					</div>
					<div className={styles.otherIngredients}>
						<h3>原材料</h3>
						<p>{product.Ingredients}</p>
					</div>
				</div>
			)}
		</div>
	);
}
