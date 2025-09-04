import { useState } from "react";
import Image from "~/component/image";
import styles from "./select-card.module.css";

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

export function SelectCard({ productData }: SelectType) {// product => productData
	const [isOpen, setIsOpen] = useState(false);
	const product = productData.product;// 追加
	return (
		<div className={styles.card}>
			<div className={styles.main}>
				<Image alt="商品の画像です" />
				<div className={styles.menuPrice}>
					<p className={styles.menu}>{product.name}</p>
					<p className={styles.price}>{product.price}</p>
				</div>
			</div>
			{isOpen ? (
				<>
					<button onClick={() => setIsOpen(false)}>表示を折りたたむ</button>
					<div className={styles.ingredients}>
						<div className={styles.allergen}>
							<h3>特定原材料28品目</h3>
							<p>{product.allergens}</p>
						</div>
						<div className={styles.otherIngredients}>
							<h3>原材料</h3>
							<p>原材料＊＊＊＊＊＊＊＊</p>
						</div>
					</div>
				</>
			) : (
				<>
					<button onClick={() => setIsOpen(true)}>
						原材料・アレルゲンを表示
					</button>
				</>
			)}
		</div>
	);
}

export function SelectCardPick({ product }: SelectType) {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div className={styles.card}>
			<div className={styles.main}>
				<div className={styles.picture}>
					<p className={styles.express}>激推し</p>
					<Image alt="商品の画像です" />
				</div>
				<div className={styles.menuPrice}>
					<p className={styles.menu}>{product.name}</p>
					<p className={styles.price}>{product.price}</p>
				</div>
			</div>
			{isOpen ? (
				<>
					<button onClick={() => setIsOpen(false)}>表示を折りたたむ</button>
					<div className={styles.ingredients}>
						<div className={styles.allergen}>
							<h3>特定原材料28品目</h3>
							<p>{product.allergens}</p>
						</div>
						<div className={styles.otherIngredients}>
							<h3>原材料</h3>
							<p>原材料＊＊＊＊＊＊＊＊</p>
						</div>
					</div>
				</>
			) : (
				<>
					<button onClick={() => setIsOpen(true)}>
						原材料・アレルゲンを表示
					</button>
				</>
			)}
		</div>
	);
}
