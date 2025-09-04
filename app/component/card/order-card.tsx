import Image from "~/component/image";
import styles from "./order-card.module.css";

export type OrderProps = {
	name: string;
	price: number;
	number: number;
};

export type OrderType = {
	product: OrderProps;
};

export function OrderCard({ productData }: OrderType) {// product => productData
	const product = productData.product;// 追加
	return (
		<div className={styles.body}>
			<Image alt="商品画像です。" />
			<div className={styles.texts}>
				<p className={styles.name}>{product.name}</p>
				<div className={styles.values}>
					<p className={styles.number}>{product.number}</p>
					<p className={styles.price}>{product.price}</p>
				</div>
			</div>
		</div>
	);
}
