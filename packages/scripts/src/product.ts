import { readFile, writeFile } from "node:fs/promises";
import type { Product } from "@latimeria/shared";
import createClient from "openapi-fetch";
import {
	AWKWARD_ORDER_DEV_ENDPOINT,
	AWKWARD_ORDER_PROD_ENDPOINT,
} from "./awkward-order";
import type { paths } from "./generated/awkward-order";

type ProductIDOmitted = Omit<Omit<Product, "id">, "classId">;
type ProductIDOmittedWithClass = ProductIDOmitted & { class: number };

export async function productCompile(
	inputPath: string,
	outputPath?: string,
	isProd?: boolean,
) {
	try {
		const content = await readFile(inputPath, {
			encoding: "utf-8",
		});
		const template: ProductIDOmittedWithClass[] = JSON.parse(content);
		const client = createClient<paths>({
			baseUrl: isProd
				? AWKWARD_ORDER_PROD_ENDPOINT
				: AWKWARD_ORDER_DEV_ENDPOINT,
		});
		const postPromises = [];
		for (const product of template) {
			postPromises.push(
				await client.POST("/product", {
					body: {
						name: product.name,
						classNumber: product.class,
						price: product.price,
						isFavorite: product.isFavorite,
						rootIngredients: product.rootIngredients,
						compositeIngredients: product.compositeIngredients,
						mayContains: product.mayContains,
						allergens: product.allergens,
						thumbnail: product.assets?.thumbnail,
					},
				}),
			);
			console.log(`Push ${product.name}...`);
		}
		const results = postPromises;
		if (outputPath) {
			const programs = results.map((v) => {
				return v.data as unknown as Product[];
			});
			await writeFile(outputPath, JSON.stringify(programs));
		}
	} catch (error) {
		throw error;
	}
}
