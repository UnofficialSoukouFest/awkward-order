export type Uuid = string;

export type Product = {
	id: Uuid;
	name: string;
	price: number;
	tags: string[];
	imagePath?: string;
};
