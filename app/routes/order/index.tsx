import { OrderCard } from "~/component/card/order-card";
import { TitleBarWithBack } from "~/component/title-bar";
import { addOrder, matchOrder } from "~/lib/order";
import type { Route } from "./+types";

export async function loader({ params, context, request }: Route.LoaderArgs) {
	const orderData = await matchOrder(context.db, { id: params.orderId });
	if (orderData.type === "error") {
		throw orderData.payload;
	}
	return orderData.payload;
}

export default function Order({ loaderData }: Route.ComponentProps) {
	return (
		<>
			<TitleBarWithBack
				pagename="選択した商品の一覧"
				themeColor={
					"var(--themecolor-main-class-" +
					["one", "two", "three", "four", "five", "six"][
						loaderData.classId - 1
					] +
					")"
				}
				textColor="var(--semantic-text-white)"
			/>
			{loaderData.purchases.map((product) => {
				console.log(product);
				return (
					<div key={product.id}>
						<OrderCard product />
					</div>
				);
			})}
		</>
	);
}
