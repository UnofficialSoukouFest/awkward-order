import { readFile, writeFile } from "node:fs/promises";
import type { Program } from "@latimeria/shared";
import createClient from "openapi-fetch";
import {
	AWKWARD_ORDER_DEV_ENDPOINT,
	AWKWARD_ORDER_PROD_ENDPOINT,
} from "./awkward-order";
import type { paths } from "./generated/awkward-order";

type ProgramIDOmitted = Omit<Program, "id">;

export async function programMigrate(
	inputPath: string,
	outputPath?: string,
	isProd?: boolean,
) {
	try {
		const content = await readFile(inputPath, {
			encoding: "utf-8",
		});
		const template: ProgramIDOmitted[] = JSON.parse(content);
		const client = createClient<paths>({
			baseUrl: isProd
				? AWKWARD_ORDER_PROD_ENDPOINT
				: AWKWARD_ORDER_DEV_ENDPOINT,
		});
		const postPromises = [];
		for (const program of template) {
			postPromises.push(
				await client.POST("/program", {
					body: {
						name: program.name,
						classNumber: program.class,
						description: program.description,
						color: program.color,
						thumbnail: program.assets?.thumbnail,
					},
				}),
			);
			console.log(`Push ${program.name}...`);
		}
		const results = postPromises;
		if (outputPath) {
			const programs = results.map((v) => {
				return v.data as unknown as Program;
			});
			await writeFile(outputPath, JSON.stringify(programs));
		}
	} catch (error) {
		throw error;
	}
}
