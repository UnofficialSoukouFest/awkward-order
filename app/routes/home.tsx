import ProductData from "~/products.json";
import type { Route } from "../../.react-router/types/app/routes/+types/home";

export function meta() {
	return [
		{ title: "Awkward-Order for YSF - 食販アプリ" },
		{
			name: "description",
			content: "食販企画のメニューや注文の確認ができます",
		},
	];
}

export function loader() {
	return ProductData;
}

export default function Home({ loaderData }: Route.ComponentProps) {
	return loaderData.map((v) => <p key={v.id}>{v.name}</p>);
}
