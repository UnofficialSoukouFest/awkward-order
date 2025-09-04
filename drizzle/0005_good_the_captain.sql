PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_program` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`class` integer NOT NULL,
	`description` text,
	`assets` text,
	`color` text
);
--> statement-breakpoint
INSERT INTO `__new_program`("id", "name", "class", "description", "assets", "color") SELECT "id", "name", "class", "description", "assets", "color" FROM `program`;--> statement-breakpoint
DROP TABLE `program`;--> statement-breakpoint
ALTER TABLE `__new_program` RENAME TO `program`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `program_class_unique` ON `program` (`class`);