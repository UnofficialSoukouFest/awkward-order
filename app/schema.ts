import type { CompositeIngredients, ProductID } from "@latimeria/shared";
import { relations } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v7 as uuidV7 } from "uuid";

export const programTable = sqliteTable("program", {
	id: int().primaryKey({ autoIncrement: true }),
	name: text().notNull(),
	class: int().notNull().unique(),
});

export const productTable = sqliteTable("product", {
	id: int().primaryKey({ autoIncrement: true }),
	name: text().notNull(),
	classId: int("class_id")
		.references(() => programTable.id)
		.notNull(),
	description: text(),
	price: int().notNull(),
	topping: text({ mode: "json" }).$type<string[]>(),
	allergen: text({ mode: "json" }).$type<string[]>(),
	assets: text({ mode: "json" }).$type<Record<string, string>>(),
	rootIngredients: text({ mode: "json" }).$type<string[]>(),
	compositeIngredients: text({ mode: "json" }).$type<CompositeIngredients[]>(),
});

export const productRelations = relations(productTable, ({ one }) => ({
	productStock: one(productStockTable),
}));

export const productStockTable = sqliteTable("stock", {
	id: int().references(() => productTable.id),
	sellout: int({ mode: "boolean" }),
	volume: int(),
});

export const productStockRelations = relations(
	productStockTable,
	({ one }) => ({
		product: one(productTable, {
			fields: [productStockTable.id],
			references: [productTable.id],
		}),
	}),
);

export const orderDataTable = sqliteTable("order", {
	id: text()
		.primaryKey()
		.$defaultFn(() => uuidV7()),
	classId: int("class_id")
		.notNull()
		.references(() => programTable.id),
	timestamp: int({ mode: "timestamp" }).notNull(),
	purchases: text({ mode: "json" }).$type<ProductID[]>(),
});
