import styles from "./menu-card.module.css";

type productType = {
	id: number;
	name: string;
	price: number;
};

type menuProps = {
	product: productType;
};

export function MenuCard({ product }: menuProps) {
	return (
		<div className={styles.menuCard}>
			<img alt="商品の画像です。" />
			<div className={styles.cardText}>
				<p className={styles.menuName}>{product.name}</p>
				<p className={styles.price}>{product.price}</p>
			</div>
		</div>
	);
}

export function MenuCardPick() {
	return (
		<div className={styles.pickMenuCard}>
			<img alt="商品の画像です。" />
			<div className={styles.pickCardText}>
				<p className={styles.pickMenuName}>
					激推しメニュー名＊＊＊＊＊＊＊＊＊＊
				</p>
				<p className={styles.pickPrice}>400円</p>
			</div>
		</div>
	);
}

export function MenuCardAll() {
	return (
		<div className={styles.allMenuCard}>
			<p>n組</p>
			<img alt="商品の画像です。" />
			<div className={styles.cardText}>
				<p className={styles.menuName}>激推しメニュー名＊＊＊＊＊＊＊＊＊＊</p>
				<p className={styles.price}>400円</p>
			</div>
		</div>
	);
}
