import { loadConfig } from "c12";

export type DriveId = string;
export type SyncDirectoryPattern = string;

export interface Config {
	drive: DriveConfig;
	assets: RemoteAssetsConfig;
}

export interface DriveConfig {
	driveIds?: DriveId[];
	syncDir: SyncDirectoryPattern[];
}

export interface RemoteAssetsConfig {
	endpoint?: string;
	accessToken?: string;
	syncDir?: SyncDirectoryPattern[];
}

/**
 * Load the Latimeria configuration
 * This function reads the configuration file using c12 and returns the parsed config.
 */
export async function loadLatimeriaConfig() {
	const { config } = await loadConfig<Config>({
		name: "latimeria",
		configFile: "latimeria.config",
	});
	return config;
}
