CREATE TABLE `order` (
	`id` text,
	`class_id` integer,
	`purchases` text,
	FOREIGN KEY (`class_id`) REFERENCES `program`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `product` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`class_id` integer,
	`description` text,
	`price` integer NOT NULL,
	`topping` text,
	`allergen` text,
	`assets` text,
	FOREIGN KEY (`class_id`) REFERENCES `program`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `program` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`class` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `program_class_unique` ON `program` (`class`);