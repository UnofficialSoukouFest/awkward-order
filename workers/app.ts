import { Hono } from "hono";
import { createRequestHandler } from "react-router";
import Api from "./api";

const app = new Hono();

app.get("*", (c) => {
	const requestHandler = createRequestHandler(
		() => import("virtual:react-router/server-build"),
		import.meta.env.MODE,
	);

	return requestHandler(c.req.raw, {
		cloudflare: { env: c.env, ctx: c.executionCtx },
	});
});

app.route("/api", Api);

export default app;
