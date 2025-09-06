import { readFile, writeFile } from "node:fs/promises";
import type { Program } from "@latimeria/shared";
import createClient from "openapi-fetch";
import {
	AWKWARD_ORDER_DEV_ENDPOINT,
	AWKWARD_ORDER_PROD_ENDPOINT,
} from "./awkward-order";
import type { paths } from "./generated/awkward-order";

type ProgramIDAsOptional = Omit<Program, "id"> & { id: number | undefined };

export async function programMigrate(
	inputPath: string,
	outputPath?: string,
	isProd?: boolean,
) {
	try {
		const content = await readFile(inputPath, {
			encoding: "utf-8",
		});
		const template: ProgramIDAsOptional[] = JSON.parse(content);
		const client = createClient<paths>({
			baseUrl: isProd
				? AWKWARD_ORDER_PROD_ENDPOINT
				: AWKWARD_ORDER_DEV_ENDPOINT,
		});
		const postPromises: Program[] = [];
		for (const program of template) {
			const programBody = program.id
				? {
						name: program.name,
						classNumber: program.class,
						description: program.description,
						color: program.color,
						thumbnail: program.assets?.thumbnail,
						svgProgramId: program.assets?.svgProgramId,
						garbageWarningText: program.assets?.garbageWarningText,
						subColor: program.assets?.subColor,
						...(isProd ? {} : { id: program.id }),
					}
				: {
						name: program.name,
						classNumber: program.class,
						description: program.description,
						color: program.color,
						thumbnail: program.assets?.thumbnail,
						svgProgramId: program.assets?.svgProgramId,
						garbageWarningText: program.assets?.garbageWarningText,
						subColor: program.assets?.subColor,
					};
			const res = await client.POST("/program", {
				body: programBody,
			});
			postPromises.push(res.data as unknown as Program);
			console.log(`Push ${program.name}...`);
		}
		const results = postPromises;
		if (outputPath) {
			await writeFile(outputPath, JSON.stringify(results));
		}
	} catch (error) {
		throw error;
	}
}
