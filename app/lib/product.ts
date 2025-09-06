import type { Product, Products } from "@latimeria/shared";
import { and, eq } from "drizzle-orm";
import { createInsertSchema, createUpdateSchema } from "drizzle-valibot";
import { flattenDeep } from "es-toolkit";
import { safeParse } from "valibot";
import { productTable } from "../schema";
import { type DBClient, Err, Ok, type Result } from ".";

type PartialProducts = Partial<Product>[];

const productInsertSchema = createInsertSchema(productTable);
const productUpdateSchema = createUpdateSchema(productTable);

export async function addProduct(
	db: DBClient,
	product: Omit<Product, "id">,
): Promise<Result<Product>> {
	const { success, issues, output } = safeParse(productInsertSchema, product);
	if (success) {
		const returns = await db.insert(productTable).values(output).returning();
		const first = returns[0];
		const product = {
			id: first.id,
			classId: first.classId,
			name: first.name,
			price: first.price,
			allergens: first.allergen ?? [],
			rootIngredients: first.rootIngredients ?? [],
			compositeIngredients: first.compositeIngredients ?? [],
			assets: {
				thumbnail: first.assets?.thumbnail,
			},
			stock: {
				sellout: false,
			},
			isFavorite: first.isFavorite ?? false,
			mayContains: first.mayContains ?? [],
		} satisfies Product;
		return Ok(product);
	} else {
		return Err(new Error(`${issues}`));
	}
}

export async function updateProduct(
	db: DBClient,
	program: Partial<Product>,
): Promise<Result<Product>> {
	const { success, issues, output } = safeParse(productUpdateSchema, program);
	if (success) {
		const builder = db.update(productTable).set(output);
		const returns = await builder.returning();
		const first = returns[0];
		const product = {
			id: first.id,
			classId: first.classId,
			name: first.name,
			price: first.price,
			allergens: first.allergen ?? [],
			rootIngredients: first.rootIngredients ?? [],
			compositeIngredients: first.compositeIngredients ?? [],
			assets: {
				thumbnail: first.assets?.thumbnail,
			},
			stock: {
				sellout: false,
			},
			isFavorite: first.isFavorite ?? false,
			mayContains: first.mayContains ?? [],
		} satisfies Product;
		return Ok(product);
	} else {
		return Err(new Error(`${issues}`));
	}
}

export async function matchProducts(
	db: DBClient,
	query?: PartialProducts,
): Promise<Result<Products>> {
	const condictions =
		query === undefined
			? () => {
					return [];
				}
			: () => {
					return query.map((q) => {
						const childCondictions = [];
						if (q.id) {
							childCondictions.push(eq(productTable.id, q.id));
						}
						if (q.name) {
							childCondictions.push(eq(productTable.name, q.name));
						}
						if (q.classId) {
							childCondictions.push(eq(productTable.classId, q.classId));
						}
						if (q.price) {
							childCondictions.push(eq(productTable.price, q.price));
						}
						if (q.allergens) {
							childCondictions.push(eq(productTable.allergen, q.allergens));
						}
						if (q.rootIngredients) {
							childCondictions.push(
								eq(productTable.rootIngredients, q.rootIngredients),
							);
						}
						if (q.compositeIngredients) {
							childCondictions.push(
								eq(productTable.compositeIngredients, q.compositeIngredients),
							);
						}
						if (q.isFavorite) {
							childCondictions.push(eq(productTable.isFavorite, q.isFavorite));
						}
						if (q.mayContains) {
							childCondictions.push(
								eq(productTable.mayContains, q.mayContains),
							);
						}
						return childCondictions;
					});
				};

	const whereBuilder = and(...flattenDeep(condictions()));
	const queryBuilder = db.query.productTable.findMany({
		with: { productStock: true },
		where: whereBuilder,
	});
	const matched = await queryBuilder;
	if (!matched) {
		return Err(new Error("No matched thing"));
	}
	const products = matched.map(
		(v) =>
			({
				id: v.id,
				classId: v.classId,
				name: v.name,
				price: v.price,
				allergens: v.allergen ?? [],
				rootIngredients: v.rootIngredients ?? [],
				compositeIngredients: v.compositeIngredients ?? [],
				assets: {
					thumbnail: v.assets?.thumbnail,
				},
				stock: {
					sellout: v.productStock?.sellout ?? false,
					volume: v.productStock?.volume ?? 100,
				},
				isFavorite: v.isFavorite ?? false,
				mayContains: v.mayContains ?? [],
			}) satisfies Product,
	);

	return Ok(products);
}

/**
 * @param db DB Connection
 * @param query
 * @returns deleted value
 */
export async function deleteProduct(
	db: DBClient,
	query: Partial<Product>,
): Promise<Result<Product>> {
	const queryBuilder = db.delete(productTable);
	if (query.id) {
		queryBuilder.where(eq(productTable.id, query.id));
	}
	if (query.name) {
		queryBuilder.where(eq(productTable.name, query.name));
	}
	const matched = await queryBuilder.returning();
	const first = matched[0];
	const product = {
		id: first.id,
		classId: first.classId,
		name: first.name,
		price: first.price,
		allergens: first.allergen ?? [],
		rootIngredients: first.rootIngredients ?? [],
		compositeIngredients: first.compositeIngredients ?? [],
		assets: {
			thumbnail: first.assets?.thumbnail,
		},
		stock: {
			sellout: false,
		},
		isFavorite: first.isFavorite ?? false,
		mayContains: first.mayContains ?? [],
	} satisfies Product;
	return matched.length > 0 && matched.length < 2
		? Ok(product)
		: Err(new Error(`Deleted ${matched.length} results. It's unexpected.`));
}
