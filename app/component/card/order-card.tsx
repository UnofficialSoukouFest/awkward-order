import type { Program } from "@latimeria/shared";
import styles from "./order-card.module.css";

export type OrderProps = {
	id: number;
	name: string;
	price: number;
	count: number;
};

export type OrderCardProps = {
	product: OrderProps;
	program: Program;
};

export function OrderCard({ product, program }: OrderCardProps) {
	return (
		<div className={styles.body}>
			<div className={styles.productImage}>
				<img alt="商品の画像です。" />
				<div className={styles.decoration_ul} style={{ backgroundColor: program.color }}/>
				<div className={styles.decoration_dr} style={{ backgroundColor: program.color }}/>
			</div>
			<div className={styles.texts}>
				<p className={styles.name}>{product.name}</p>
				<p className={styles.values}>
					<span className={styles.number}>
						{product.count + "個"}
					</span>
					<span className={styles.price}>
						{"￥" + product.price}
					</span>
				</p>
			</div>
		</div>
	);
}
