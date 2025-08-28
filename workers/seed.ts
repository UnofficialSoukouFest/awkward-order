import { defineFactory } from "@praha/drizzle-factory";
import { v7 } from "uuid";
import {
	OrderDataTable,
	productStockTable,
	productTable,
	programTable,
} from "~/schema";

const schema = {
	program: programTable,
	product: productTable,
	stock: productStockTable,
	order: OrderDataTable,
};

export const programFactory = defineFactory({
	schema,
	table: "program",
	resolver: ({ sequence }) => ({
		id: sequence,
		name: `name-${sequence}`,
		class: sequence,
	}),
});

export const productFactory = defineFactory({
	schema,
	table: "product",
	resolver: ({ sequence, use }) => ({
		id: sequence,
		name: `name-${sequence}`,
		classId: () => use(programFactory).create().then(p => p.id),
		description: `it is name-${sequence}`,
		price: 300,
		topping: ["たれ", "しお"],
		allergen: ["卵", "牛乳"],
		assets: {},
		rootIngredients: ["果糖", "ビタミンC"],
		compositeIngredients: [{ name: "食塩" }],
	}),
});

export const productStockFactory = defineFactory({
	schema,
	table: "stock",
	resolver: ({ sequence, use }) => ({
		id: () =>
			use(productFactory)
				.create()
				.then((product) => product.id),
		sellout: sequence % 2 === 0,
		volume: sequence * 10,
	}),
});

export const orderFactory = defineFactory({
	schema,
	table: "order",
	resolver: ({ sequence, use }) => ({
		id: v7(),
		classId: () =>
			use(programFactory)
				.create()
				.then((program) => program.id),
		timestamp: new Date(),
		purchases: [`name-${sequence}`],
	}),
});
