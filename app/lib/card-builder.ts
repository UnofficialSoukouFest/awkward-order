import type { OrderData, Products } from "@latimeria/shared";
import type { OrderCardProps, OrderProps } from "~/component/card/order-card";
import type { DisplayType } from "~/component/card/select-card";
import { formatIngredient } from "./ingredients";

export function select(products: Products): [DisplayType, number][] {
	return products.map((product) => {
		const displayProduct: DisplayType = {
			name: product.name,
			price: product.price,
			classId: product.classId,
			allergens: product.allergens,
			mayContainAllergens: product.mayContains ?? [],
			Ingredients: formatIngredient(
				product.rootIngredients,
				product.compositeIngredients ?? [],
			),
			isFavorite: product.isFavorite,
		};
		return [displayProduct, product.id];
	});
}

export function order(
	orderData: OrderData,
	classNumber: number,
): [OrderCardProps, number][] {
	return orderData.purchases.map((item) => {
		const product: OrderProps = {
			name: item.name,
			price: item.price,
			count: 1,
		};
		const orderType: OrderCardProps = {
			product: product,
			classNumber: classNumber,
		};
		return [orderType, item.id];
	});
}
