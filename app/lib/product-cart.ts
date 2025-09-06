import type { ProductID } from "@latimeria/shared";
import { Err, Ok, OkAsVoid, type Result } from ".";

export type Purchases = Map<ProductID, number>;

export class ProductCart {
	purchases: Purchases;
	constructor() {
		this.purchases = new Map();
	}

	add(product: ProductID) {
		if (this.purchases.has(product)) {
			this.purchases.set(product, (this.purchases.get(product) as number) + 1);
			return;
		}
		this.purchases.set(product, 1);
	}

	getQuantity(product: ProductID): Result<number> {
		const p = this.purchases.get(product);
		if (!p) {
			return Err(new Error("This product doesn't be existed"));
		}
		return Ok(p);
	}

	decrease(product: ProductID, difference?: number): Result<void> {
		const p = this.purchases.get(product);
		if (!p) {
			return Err(new Error("This product doesn't be existed"));
		}
		if (p <= 1) {
			this.purchases.delete(product);
			return OkAsVoid();
		}
		if (difference) {
			this.purchases.set(product, p - difference);
		} else {
			this.purchases.set(product, p - 1);
		}
		return OkAsVoid();
	}

	delete(product: ProductID): Result<boolean> {
		return Ok(this.purchases.delete(product));
	}
}
