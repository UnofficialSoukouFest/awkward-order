import { OrderCard, type OrderProps } from "~/component/card/order-card";
import { TitleBarWithBack } from "~/component/title-bar";
import { matchOrder } from "~/lib/order";
import { matchProgram } from "~/lib/program";
import type { Route } from "./+types";

export async function loader({ params, context }: Route.LoaderArgs) {
	const orderData = await matchOrder(context.db, { id: params.orderId });
	if (orderData.type === "error") {
		throw orderData.payload;
	}
	const programResult = await matchProgram(context.db, {
		id: orderData.payload.classId,
	});
	if (programResult.type === "error") {
		throw programResult.payload;
	}
	return {
		orderData: orderData.payload,
		program: programResult.payload,
	};
}

export default function Order({ loaderData }: Route.ComponentProps) {
	return (
		<>
			<TitleBarWithBack
				pagename="選択した商品の一覧"
				themeColor={
					"var(--themecolor-main-class-" +
					["one", "two", "three", "four", "five", "six"][
						loaderData.program.class - 1
					] +
					")"
				}
				textColor="var(--semantic-text-white)"
			/>
			{loaderData.orderData.purchases.map((product) => {
				const orderDisplay: OrderProps = {
					name: product.name,
					price: product.price,
					count: 1,
				};
				return (
					<div key={product.id}>
						<OrderCard
							product={orderDisplay}
							classNumber={loaderData.program.class}
						/>
					</div>
				);
			})}
		</>
	);
}
