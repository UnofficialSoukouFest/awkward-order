/*
 * Basic Type Definitions for awkward-order
 */

export type Uuid = string;

export type ClassID = number;

export type ProductID = number;

export type Program = {
	id: ClassID;
	name: string;
	class: number;
};

export type Product = {
	id: ProductID;
	name: string;
	price: number;
	tags: string[];
	imagePath?: string;
};

export type OrderData = {
	id: Uuid;
	classId: ClassID;
	purchases: Product[];
};
