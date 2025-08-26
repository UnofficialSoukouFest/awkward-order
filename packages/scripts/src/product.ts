import { readFile, writeFile } from "node:fs/promises";
import type { Product } from "@latimeria/shared";
import { v4 as uuidv4 } from "uuid";

function createProduct(
	name: string,
	price: number,
	tags: string[],
	imagePath?: string,
): Product {
	return {
		id: uuidv4(),
		name,
		price,
		tags,
		imagePath,
	};
}

function export_json(product: Product[]): string {
	return JSON.stringify(product);
}

export async function productCompile(inputPath: string, outputPath: string) {
	const content = await readFile(inputPath, {
		encoding: "utf-8",
	});
	const template: {
		name: string;
		price: number;
		tags: string[];
		imagePath?: string;
	}[] = JSON.parse(content);
	const products: Product[] = [];
	for (const templateElement of template) {
		products.push(
			createProduct(
				templateElement.name,
				templateElement.price,
				templateElement.tags,
				templateElement.imagePath,
			),
		);
	}
	await writeFile(outputPath, export_json(products));
}
