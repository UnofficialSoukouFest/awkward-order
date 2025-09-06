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
	let groupedPurchaces:OrderProps[] = []
	for(const product of loaderData.orderData.purchases){
		const exist = groupedPurchaces.find((purchace) => purchace.id === product.id && purchace.price === product.price);
		if(exist){
			exist.count ++;
		}
		else{
			groupedPurchaces.push({ id: product.id, name: product.name, price: product.price, count: 1})
		}
	}
	let sumPrice = 0
	for(let gpurchace of groupedPurchaces){
		sumPrice += gpurchace.price * gpurchace.count // 算数ポイント
	}
	return (
		<>
			<TitleBarWithBack
				pagename="選択した商品の一覧"
				themeColor={loaderData.program.color}
				textColor="var(--semantic-text-white)"
			/>
			{groupedPurchaces.map((gpurchace) => {
				return (
					<OrderCard
						key={gpurchace.id}
						product={gpurchace}
						program={loaderData.program}
					/>
				);
			})}
			<p style={{ textAlign: "right" }}>
				{"合計金額: "}
				<span style={{ fontSize: "xx-large", fontWeight: "bold" }}>{"￥" + sumPrice}</span>
			</p>
		</>
	);
}
