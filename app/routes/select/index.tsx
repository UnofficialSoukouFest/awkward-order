import { data } from "react-router";
import { matchProducts } from "~/lib/product";
import { matchProgram } from "~/lib/program";
import type { Route } from "./+types";

export async function loader({ params, context }: Route.LoaderArgs) {
	const programResult = await matchProgram(context.db, {
		class: Number(params.classId),
	});
	if (programResult.type === "error") {
		throw data(programResult.payload, { status: 500 });
	}
	const productResult = await matchProducts(context.db, {
		classId: Number(params.classId),
	});
	if (productResult.type === "error") {
		throw data(productResult.payload, { status: 500 });
	}
	return {
		program: programResult.payload,
		products: productResult.payload,
	};
}

export default function Select() {
	return <div>Select Page</div>;
}
