import { type DrizzleD1Database, drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import { createRequestHandler } from "react-router";
import * as schema from "~/schema";
import { app as apiApp } from "./api";

declare module "react-router" {
	export interface AppLoadContext {
		cloudflare: {
			env: Env;
			ctx: ExecutionContext;
		};
		db: DrizzleD1Database<typeof schema> & { $client: D1Database };
	}
}

type Bindings = {
	DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.route("/api", apiApp);

app.get("/dev", async (c) => {
	// NOTE: このオブジェクトの並びは外部キーの依存順を考慮したものです
	const tables = {
		program: schema.programTable,
		product: schema.productTable,
		stock: schema.productStockTable,
		order: schema.orderDataTable,
	};
	const db = drizzle(c.env.DB, { schema: tables });
	for (const table of Object.values(tables).reverse()) {
		await db.delete(table);
	}
	return c.json({ message: "all data cleaned!" });
});

app.get("*", (c) => {
	const requestHandler = createRequestHandler(
		() => import("virtual:react-router/server-build"),
		import.meta.env.MODE,
	);

	const db = drizzle(c.env.DB, { schema });
	return requestHandler(c.req.raw, {
		cloudflare: { env: c.env, ctx: c.executionCtx },
		db: db,
	});
});

export default app;
