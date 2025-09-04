import {
	index,
	layout,
	type RouteConfig,
	route,
} from "@react-router/dev/routes";

export default [
	layout("routes/layout.tsx", [
		index("routes/home.tsx"),
		route("menu", "routes/menu/index.tsx"),
		route("order/:orderId", "routes/order/index.tsx"),
		route(":classId", "routes/hclass/index.tsx"),
		route(":classId/select", "routes/select/index.tsx"),
		route("allergyTable", "routes/allergyTable/index.jsx"),
	]),
] satisfies RouteConfig;
