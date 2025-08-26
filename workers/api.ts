import { drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import { describeRoute, openAPISpecs } from "hono-openapi";
import { validator as vValidator } from "hono-openapi/valibot";
import * as v from "valibot";
import { isOk } from "~/lib";
import { addProgram } from "~/lib/product";

type Binding = {
	DB: D1Database;
};

const app = new Hono<{ Bindings: Binding }>();

const addProgramSchema = v.object({
	name: v.string(),
	classNumber: v.pipe(
		v.number(),
		v.minValue(1, "the number of class is only 6!"),
		v.maxValue(6, "the number of class is only 6!"),
	),
});

app.post(
	"/program",
	describeRoute({
		summary: "Add program",
		responses: {
			200: {
				description: "Successed adding program to database",
			},
		},
	}),
	vValidator("json", addProgramSchema),
	async (c) => {
		const db = drizzle(c.env.DB);
		const { name, classNumber } = c.req.valid("json");
		const result = await addProgram(db, {
			name: name,
			class: classNumber,
		});
		if (isOk(result)) {
			return c.json(result.payload);
		} else {
			return c.text(`${result.payload}`, 500);
		}
	},
);

app.get(
	"/openapi",
	openAPISpecs(app, {
		documentation: {
			info: {
				title: "Awkward-Order Manage API",
				version: "0.1.0",
				description: "Management API. it's used such as add/delete product and program",
			},
			servers: [],
		},
	}),
);

export default app;
