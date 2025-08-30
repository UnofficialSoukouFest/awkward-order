PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_order` (
	`id` text PRIMARY KEY NOT NULL,
	`class_id` integer NOT NULL,
	`timestamp` integer NOT NULL,
	`purchases` text,
	FOREIGN KEY (`class_id`) REFERENCES `program`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_order`("id", "class_id", "timestamp", "purchases") SELECT "id", "class_id", "timestamp", "purchases" FROM `order`;--> statement-breakpoint
DROP TABLE `order`;--> statement-breakpoint
ALTER TABLE `__new_order` RENAME TO `order`;--> statement-breakpoint
PRAGMA foreign_keys=ON;