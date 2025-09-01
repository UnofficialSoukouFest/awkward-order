import styles from "./menu-card.module.css";

type ProductType = {
	classId?: number;
	id: number;
	name: string;
	price: number;
};

type MenuProps = {
	product: ProductType;
};

export function MenuCard({ product }: MenuProps) {
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

export function MenuCardPick({ product }: MenuProps) {
	return (
		<div className={styles.pickMenuCard}>
			<img alt="商品の画像です。" />
			<div className={styles.pickCardText}>
				<p className={styles.pickMenuName}>{product.name}</p>
				<p className={styles.pickPrice}>{product.price}</p>
			</div>
		</div>
	);
}

export function MenuCardAll({ product }: MenuProps) {
	return (
		<div className={styles.allMenuCard}>
			<p>{product.classId}</p>
			<img alt="商品の画像です。" />
			<div className={styles.cardText}>
				<p className={styles.menuName}>{product.name}</p>
				<p className={styles.price}>{product.price}</p>
			</div>
		</div>
	);
}
