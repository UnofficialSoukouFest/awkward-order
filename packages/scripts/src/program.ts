import { readFile, writeFile } from "node:fs/promises";
import type { Program } from "@latimeria/shared";
import createClient from "openapi-fetch";
import { AWKWARD_ORDER_DEFAULT_ENDPOINT } from "./awkward-order";
import type { paths } from "./generated/awkward-order";

type ProgramIDOmitted = Omit<Program, "id">;

export async function programMigrate(inputPath: string, outputPath?: string) {
	const content = await readFile(inputPath, {
		encoding: "utf-8",
	});
	const template: ProgramIDOmitted[] = JSON.parse(content);
	const client = createClient<paths>({
		baseUrl: AWKWARD_ORDER_DEFAULT_ENDPOINT,
	});
	const postPromises = [];
	for (const program of template) {
		postPromises.push(
			client.POST("/program", {
				body: {
					name: program.name,
					classNumber: program.class,
				},
			}),
		);
	}
	const results = await Promise.all(postPromises);
	if (outputPath) {
		const programs = results.map((v) => {
			return v.data as unknown as Program;
		});
		await writeFile(outputPath, JSON.stringify(programs));
	}
}
