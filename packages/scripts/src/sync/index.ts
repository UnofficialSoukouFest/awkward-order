import type { LatimeriaDB } from "../db";

export { SyncAgent as DriveSyncAgent } from "./drive";

export const DEFAULT_SYNC_FILE_REGEXP = /.*?/;

export interface SyncFileSchema {
	_rev?: string;
	_id: string;
	hash: string;
	date: string;
}

export type SyncMode = "download" | "upload" | "both";

export interface BaseSyncAgent<Options, Client> {
	options: Options;
	db: LatimeriaDB;
	setup(): Promise<void>;
	sync(client: Client, mode: SyncMode): Promise<void>;
}
