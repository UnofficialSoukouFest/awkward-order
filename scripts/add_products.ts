import type { Product } from "~/lib";
import { v4 as uuidv4 } from "uuid";
import * as fs from "node:fs/promises";

let products: Product[] = [];

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

function add_product(product: Product) {
	products = [...products, product];
}

function export_json(): string {
	return JSON.stringify(products);
}

async function main() {
	const content = await fs.readFile("./scripts/products_template.json", {
		encoding: "utf-8",
	});
	const template: {
		name: string;
		price: number;
		tags: string[];
		imagePath?: string;
	}[] = JSON.parse(content);
	for (const templateElement of template) {
		add_product(
			createProduct(
				templateElement.name,
				templateElement.price,
				templateElement.tags,
				templateElement.imagePath,
			),
		);
	}
	await fs.writeFile("./app/products.json", export_json());
}

await main();
