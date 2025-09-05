import type { Route } from "./+types";
import {
	OrderCard,
	type OrderType,
	type OrderProps,
} from "~/component/card/order-card";
import {
	SelectCard,
	type SelectType,
	type DisplayType,
} from "~/component/card/select-card";
import { formatIngredient } from "~/lib/ingredients";

export function select(loaderData: Route.ComponentProps): [SelectType, any][] {
	return loaderData.products.map((product) => {
		const displayProduct: DisplayType = {
			name: product.name,
			price: product.price,
			classId: product.classId,
			allergens: product.allergens,
			mayContainAllergens: product.mayContains,
			Ingredients: formatIngredient(
				product.rootIngredients,
				product.compositeIngredients,
			),
		};
		const selectType: SelectType = {
			product: displayProduct,
		};
		return [selectType, product.id];
	});
}
export function order(loaderData: Route.ComponentProps): [OrderType, any][] {
	return loaderData.order.purchases.map((item) => {
		const product: OrderProps = {
			name: item.name,
			price: item.price,
			number: 1,
		};
		const orderType: OrderType = {
			product: product,
		};
		return [orderType, item.id];
	});
}
