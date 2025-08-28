import type { Program } from "@latimeria/shared";
import { eq } from "drizzle-orm";
import { createInsertSchema, createUpdateSchema } from "drizzle-valibot";
import { safeParse } from "valibot";
import { programTable } from "~/schema";
import { type DBClient, Err, Ok, type Result } from ".";

const programInsertSchema = createInsertSchema(programTable);
const programUpdateSchema = createUpdateSchema(programTable);

export async function addProgram(
	db: DBClient,
	program: Omit<Program, "id">,
): Promise<Result<Program>> {
	const { success, issues, output } = safeParse(programInsertSchema, program);
	if (success) {
		const returns = await db.insert(programTable).values(output).returning();
		const first: Program = returns[0];
		return Ok(first);
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
		const first: Program = returns[0];
		return Ok(first);
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
	return matched.length > 0 && matched.length < 2
		? Ok(matched[0])
		: Err(new Error(`Matched ${matched.length} results. It's unexpected.`));
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
	return matched.length > 0 && matched.length < 2
		? Ok(matched[0])
		: Err(new Error(`Deleted ${matched.length} results. It's unexpected.`));
}
