import type { CompositeIngredients } from "@latimeria/shared";
import { drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import { describeRoute, openAPISpecs } from "hono-openapi";
import { validator as vValidator } from "hono-openapi/valibot";
import * as v from "valibot";
import { isOk } from "~/lib";
import { addProduct } from "~/lib/product";
import { addProgram, matchProgram } from "~/lib/program";
import * as schema from "~/schema";

type Binding = {
	DB: D1Database;
};

export const app = new Hono<{ Bindings: Binding }>();

const addProgramSchema = v.object({
	name: v.string(),
	classNumber: v.number(),
	description: v.string(),
	color: v.string(),
	thumbnail: v.optional(v.string()),
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
		const db = drizzle(c.env.DB, { schema: schema });
		const { name, classNumber, description, color, thumbnail } =
			c.req.valid("json");
		const result = await addProgram(db, {
			name: name,
			class: classNumber,
			color: color,
			description: description,
			assets: {
				thumbnail: thumbnail,
			},
		});
		if (isOk(result)) {
			return c.json(result.payload);
		} else {
			return c.text(`${result.payload}`, 500);
		}
	},
);

const compositeIngredientsSchema: v.GenericSchema<CompositeIngredients> =
	v.object({
		name: v.string(),
		compositeIngredients: v.optional(
			v.array(v.lazy(() => compositeIngredientsSchema)),
		),
	});

const addProductSchema = v.object({
	name: v.string(),
	classNumber: v.pipe(
		v.number(),
		v.minValue(1, "the number of class is only 6!"),
		v.maxValue(6, "the number of class is only 6!"),
	),
	price: v.number(),
	isFavorite: v.boolean(),
	rootIngredients: v.array(v.string()),
	compositeIngredients: v.optional(v.array(compositeIngredientsSchema)),
	mayContains: v.optional(v.array(v.string())),
	allergens: v.array(v.string()),
	thumbnail: v.optional(v.string()),
});

app.post(
	"/product",
	describeRoute({
		summary: "Add product",
		responses: {
			200: {
				description: "Successed adding program to database",
			},
		},
	}),
	vValidator("json", addProductSchema),
	async (c) => {
		const db = drizzle(c.env.DB, { schema: schema });
		const {
			name,
			classNumber,
			price,
			isFavorite,
			rootIngredients,
			compositeIngredients,
			mayContains,
			allergens,
			thumbnail,
		} = c.req.valid("json");
		const program = await matchProgram(db, { class: classNumber });
		if (program.type === "error") {
			return c.text(`${program.payload}`, 500);
		}
		const result = await addProduct(db, {
			name: name,
			classId: program.payload.id,
			price: price,
			isFavorite: isFavorite,
			rootIngredients: rootIngredients,
			compositeIngredients: compositeIngredients,
			mayContains: mayContains,
			allergens: allergens,
			assets: {
				thumbnail: thumbnail,
			},
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
				description:
					"Management API. it's used such as add/delete product and program",
			},
		},
	}),
);
