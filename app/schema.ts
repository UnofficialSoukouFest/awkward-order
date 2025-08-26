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
	classId: int("class_id").references(() => programTable.id),
	description: text(),
	price: int().notNull(),
	topping: text({ mode: "json" }).$type<string[]>(),
	allergen: text({ mode: "json" }).$type<string[]>(),
	assets: text({ mode: "json" }).$type<Record<string, string>>(),
});

export const OrderDataTable = sqliteTable("order", {
	id: text().$defaultFn(() => uuidV7()),
	classId: int("class_id").references(() => programTable.id),
	timestamp: int({ mode: "timestamp" }),
	purchases: text({ mode: "json" }).$type<string[]>(),
});
