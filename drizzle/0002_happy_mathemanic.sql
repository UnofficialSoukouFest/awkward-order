CREATE TABLE `stock` (
	`id` integer,
	`sellout` integer,
	`volume` integer,
	FOREIGN KEY (`id`) REFERENCES `product`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_product` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`class_id` integer NOT NULL,
	`description` text,
	`price` integer NOT NULL,
	`topping` text,
	`allergen` text,
	`assets` text,
	`rootIngredients` text,
	`compositeIngredients` text,
	FOREIGN KEY (`class_id`) REFERENCES `program`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_product`("id", "name", "class_id", "description", "price", "topping", "allergen", "assets", "rootIngredients", "compositeIngredients") SELECT "id", "name", "class_id", "description", "price", "topping", "allergen", "assets", "rootIngredients", "compositeIngredients" FROM `product`;--> statement-breakpoint
DROP TABLE `product`;--> statement-breakpoint
ALTER TABLE `__new_product` RENAME TO `product`;--> statement-breakpoint
PRAGMA foreign_keys=ON;