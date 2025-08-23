import type { Product } from "@latimeria/shared";

export function sumProductsPrices(products: Product[]) {
	return products.reduce((acc, cur) => acc + cur.price, 0);
}
