import type { Program } from "@latimeria/shared";
import { and, eq } from "drizzle-orm";
import { createInsertSchema, createUpdateSchema } from "drizzle-valibot";
import { safeParse } from "valibot";
import { programTable } from "~/schema";
import { type DBClient, Err, Ok, type Result } from ".";
import { flattenDeep } from "es-toolkit";

const programInsertSchema = createInsertSchema(programTable);
const programUpdateSchema = createUpdateSchema(programTable);

export type PartialPrograms = Partial<Program>[]

export async function addProgram(
	db: DBClient,
	program: Omit<Program, "id">,
): Promise<Result<Program>> {
	const { success, issues, output } = safeParse(programInsertSchema, program);
	if (success) {
		const returns = await db.insert(programTable).values(output).returning();
		const first = returns[0];
		const program = {
			id: first.id,
			name: first.name,
			class: first.class,
			color: first.color,
			description: first.description ?? undefined,
			assets: first.assets ?? undefined,
		} satisfies Program;
		return Ok(program);
	} else {
		return Err(new Error(`${issues}`));
	}
}

export async function updateProgram(
	db: DBClient,
	program: Partial<Omit<Program, "id">>,
) {
	const { success, issues, output } = safeParse(programUpdateSchema, program);
	if (success) {
		const builder = db.update(programTable).set(output);
		if (program.class) {
			builder.where(eq(programTable.class, program.class));
		}
		if (program.name) {
			builder.where(eq(programTable.name, program.name));
		}
		const returns = await builder.returning();
		const first = returns[0];
		const res = {
			id: first.id,
			name: first.name,
			class: first.class,
			color: first.color,
			description: first.description ?? undefined,
			assets: first.assets ?? undefined,
		} satisfies Program;
		return Ok(res);
	} else {
		return Err(new Error(`${issues}`));
	}
}

export async function matchProgram(
	db: DBClient,
	query: Partial<Program>,
): Promise<Result<Program>> {
	const queryBuilder = db.select().from(programTable);
	if (query.class) {
		queryBuilder.where(eq(programTable.class, query.class));
	}
	if (query.id) {
		queryBuilder.where(eq(programTable.id, query.id));
	}
	if (query.name) {
		queryBuilder.where(eq(programTable.name, query.name));
	}
	const matched = await queryBuilder;
	const first = matched[0];
	const res = {
		id: first.id,
		name: first.name,
		class: first.class,
		color: first.color,
		description: first.description ?? undefined,
		assets: first.assets ?? undefined,
	} satisfies Program;
	return matched.length > 0 && matched.length < 2
		? Ok(res)
		: Err(new Error(`Matched ${matched.length} results. It's unexpected.`));
}

export async function matchPrograms(
	db: DBClient,
	query?: PartialPrograms,
): Promise<Result<Program[]>> {
	const condictions =
		query === undefined
			? () => {
					return [];
				}
			: () => {
					return query.map((q) => {
						const childCondictions = [];
						if (q.id) {
							childCondictions.push(eq(programTable.id, q.id));
						}
						if (q.name) {
							childCondictions.push(eq(programTable.name, q.name));
						}
						if (q.class) {
							childCondictions.push(eq(programTable.class, q.class));
						}
						if (q.color) {
							childCondictions.push(eq(programTable.color, q.color));
						}
						return childCondictions;
					});
				};

	const whereBuilder = and(...flattenDeep(condictions()));
	const queryBuilder = db.query.programTable.findMany({
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
				name: v.name,
				class: v.class,
				color: v.color,
				description: v.description ?? undefined,
				assets: v.assets ?? undefined,
			}) satisfies Program,
	);

	return Ok(products);
}

/**
 * @param db DB Connection
 * @param query
 * @returns deleted value
 */
export async function deleteProgram(
	db: DBClient,
	query: Partial<Program>,
): Promise<Result<Program>> {
	const queryBuilder = db.delete(programTable);
	if (query.class) {
		queryBuilder.where(eq(programTable.class, query.class));
	}
	if (query.id) {
		queryBuilder.where(eq(programTable.id, query.id));
	}
	if (query.name) {
		queryBuilder.where(eq(programTable.name, query.name));
	}
	const matched = await queryBuilder.returning();
	const first = matched[0];
	const res = {
		id: first.id,
		name: first.name,
		class: first.class,
		color: first.color,
		description: first.description ?? undefined,
		assets: first.assets ?? undefined,
	} satisfies Program;
	return matched.length > 0 && matched.length < 2
		? Ok(res)
		: Err(new Error(`Deleted ${matched.length} results. It's unexpected.`));
}
