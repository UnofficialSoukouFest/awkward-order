import type { Product } from "~/lib/types";

export * from "./types";

export function sumProductsPrices(products: Product[]) {
	return products.reduce((acc, cur) => acc + cur.price, 0);
}
