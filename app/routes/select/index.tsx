import { data } from "react-router";
import { addOrder, matchOrder } from "~/lib/order";
import { matchProducts } from "~/lib/product";
import { matchProgram } from "~/lib/program";
import { getSession } from "~/sessions.server";
import type { Route } from "./+types";

export async function loader({ params, context, request }: Route.LoaderArgs) {
	const programResult = await matchProgram(context.db, {
		class: Number(params.classId),
	});
	if (programResult.type === "error") {
		throw data(programResult.payload, { status: 500 });
	}
	const productResult = await matchProducts(context.db, [
		{ classId: Number(params.classId) },
	]);
	if (productResult.type === "error") {
		throw data(productResult.payload, { status: 500 });
	}
	const session = await getSession(request.headers.get("Cookie"));
	const orderData = session.has("orderId")
		? await addOrder(context.db, {
				classId: Number(params.classId),
				date: new Date(),
				purchases: [],
			})
		: await matchOrder(context.db, { id: session.get("orderId") });
	if (orderData.type === "error") {
		throw data(orderData.payload, { status: 500 });
	}
	return {
		program: programResult.payload,
		products: productResult.payload,
		order: orderData.payload,
	};
}

export default function Select() {
	return (
		<div>
			Select Page
			<p>選択してください</p>
		</div>
	);
}
