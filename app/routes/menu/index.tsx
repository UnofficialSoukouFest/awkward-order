import { data } from "react-router";
import { matchProducts } from "~/lib/product";
import type { Route } from "./+types";

export async function loader({ context }: Route.LoaderArgs) {
	const productResult = await matchProducts(context.db, {});
	if (productResult.type === "error") {
		throw data(productResult.payload, { status: 500 });
	}
	return {
		products: productResult.payload,
	};
}

export default function Menu({ loaderData }: Route.ComponentProps) {
	const products = loaderData.products;
	return (
		<div>
			Menu List Page(all class)
			{products.length} menu!
		</div>
	);
}
