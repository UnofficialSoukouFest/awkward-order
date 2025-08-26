import type { Program } from "@latimeria/shared";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import { createInsertSchema } from "drizzle-valibot";
import { safeParse } from "valibot";
import { programTable } from "../schema";
import { Err, Ok, type Result } from ".";

const programInsertSchema = createInsertSchema(programTable);

export async function addProgram(
	db: DrizzleD1Database,
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
