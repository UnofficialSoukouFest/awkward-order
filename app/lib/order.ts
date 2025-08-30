import type { OrderData, Products, Uuid } from "@latimeria/shared";
import { eq } from "drizzle-orm";
import { createInsertSchema, createUpdateSchema } from "drizzle-valibot";
import { safeParse } from "valibot";
import { orderDataTable } from "~/schema";
import { type DBClient, Err, Ok, type Result } from ".";
import { matchProducts } from "./product";

const orderInsertSchema = createInsertSchema(orderDataTable);
const orderUpdateSchema = createUpdateSchema(orderDataTable);

export async function addOrder(
	db: DBClient,
	order: Omit<OrderData, "id">,
): Promise<Result<OrderData>> {
	const { success, issues, output } = safeParse(orderInsertSchema, order);
	if (success) {
		const returns = await db.insert(orderDataTable).values(output).returning();
		const first = returns[0];
		let products: Products = [];
		if (first.purchases) {
			const res = await matchProducts(
				db,
				first.purchases.map((pid) => ({
					id: pid,
				})),
			);
			if (res.type === "error") {
				return Err(res.payload);
			}
			products = res.payload;
		}
		const OrderData: OrderData = {
			id: first.id,
			classId: first.classId,
			date: first.timestamp,
			purchases: products,
		};
		return Ok(OrderData);
	} else {
		return Err(new Error(`${issues}`));
	}
}

export async function matchOrder(
	db: DBClient,
	query: Partial<OrderData>,
): Promise<Result<OrderData>> {
	const matchedOrder = await db.query.orderDataTable.findFirst({
		where(fields, { eq, and }) {
			const params = [];
			if (query.id) {
				params.push(eq(fields.id, query.id));
			}
			if (query.classId) {
				params.push(eq(fields.classId, query.classId));
			}
			if (query.date) {
				params.push(eq(fields.timestamp, query.date));
			}
			if (query.purchases) {
				params.push(
					eq(
						fields.purchases,
						query.purchases.map((v) => v.id),
					),
				);
			}
			return and(...params);
		},
	});
	if (!matchedOrder) {
		return Err(new Error("No match in order data"));
	}
	let products: Products = [];
	if (matchedOrder.purchases) {
		const res = await matchProducts(
			db,
			matchedOrder.purchases.map((pid) => ({
				id: pid,
			})),
		);
		if (res.type === "error") {
			return Err(res.payload);
		}
		products = res.payload;
	}
	return Ok({
		id: matchedOrder.id,
		classId: matchedOrder.classId,
		date: matchedOrder.timestamp,
		purchases: products,
	});
}

export async function updateOrder(
	db: DBClient,
	orderData: Partial<Omit<OrderData, "id">>,
	id: Uuid,
) {
	const { success, issues, output } = safeParse(orderUpdateSchema, orderData);
	if (success) {
		const builder = db
			.update(orderDataTable)
			.set(output)
			.where(eq(orderDataTable.id, id));
		const returns = await builder.returning();
		const first = returns[0];
		let products: Products = [];
		if (first.purchases) {
			const res = await matchProducts(
				db,
				first.purchases.map((pid) => ({
					id: pid,
				})),
			);
			if (res.type === "error") {
				return Err(res.payload);
			}
			products = res.payload;
		}
		const OrderData: OrderData = {
			id: first.id,
			classId: first.classId,
			date: first.timestamp,
			purchases: products,
		};
		return Ok(OrderData);
	} else {
		return Err(new Error(`${issues}`));
	}
}
