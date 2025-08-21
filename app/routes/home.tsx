import ProductData from "~/products.json";
import type { Route } from "../../.react-router/types/app/routes/+types/home";

export function meta() {
	return [
		{ title: "New React Router App" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export function loader() {
	return ProductData;
}

export default function Home({ loaderData }: Route.ComponentProps) {
	return loaderData.map((v) => <p key={v.id}>{v.name}</p>);
}
