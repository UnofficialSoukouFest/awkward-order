/*
 * Basic Type Definitions for awkward-order
 */

export type Uuid = string;

export type ClassID = number;

export type ProductID = number;

export type Assets = {
	thumbnail?: string;
	header?: string;
} & { [key: string]: string };

export type Program = {
	id: ClassID;
	name: string;
	class: number;
	assets?: Assets;
};

export type CompositeIngredients = {
	name: string;
	compositeIngredients?: CompositeIngredients[];
};

export type ProductStock = {
	sellout: boolean;
	volume?: number;
};

export type Product = {
	id: ProductID;
	classId: ClassID;
	name: string;
	price: number;
	assets?: Assets;
	allergens: string[]; // 28品目
	rootIngredients: string[]; // 原材料
	compositeIngredients: CompositeIngredients[];
	stock?: ProductStock;
};

export type Products = Product[];

export type OrderData = {
	id: Uuid;
	classId: ClassID;
	date: Date;
	purchases: Product[];
};
