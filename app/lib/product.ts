import type { Product, Products } from "@latimeria/shared";
import { eq } from "drizzle-orm";
import { createInsertSchema, createUpdateSchema } from "drizzle-valibot";
import { safeParse } from "valibot";
import { productTable } from "../schema";
import { type DBClient, Err, Ok, type Result } from ".";

const productInsertSchema = createInsertSchema(productTable);
const productUpdateSchema = createUpdateSchema(productTable);

export async function addProduct(
	db: DBClient,
	product: Omit<Product, "id">,
): Promise<Result<Product>> {
	const { success, issues, output } = safeParse(productInsertSchema, product);
	if (success) {
		const returns = await db.insert(productTable).values(output).returning();
		const first: Product = returns[0];
		return Ok(first);
	} else {
		return Err(new Error(`${issues}`));
	}
}

export async function updateProduct(
	db: DBClient,
	program: Partial<Omit<Product, "id">>,
) {
	const { success, issues, output } = safeParse(productUpdateSchema, program);
	if (success) {
		const builder = db.update(productTable).set(output);
		const returns = await builder.returning();
		const first: Product = returns[0];
		return Ok(first);
	} else {
		return Err(new Error(`${issues}`));
	}
}

export async function matchProducts(
	db: DBClient,
	query: Partial<Product>,
): Promise<Result<Products>> {
	const queryBuilder = db.query.productTable.findMany({
		with: { productStock: true },
		where(fields, { eq }) {
			if (query.id) {
				return eq(fields.id, query.id);
			}
		},
	});
	const matched = await queryBuilder;
	return Ok(matched);
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
	return matched.length > 0 && matched.length < 2
		? Ok(matched[0])
		: Err(new Error(`Deleted ${matched.length} results. It's unexpected.`));
}
