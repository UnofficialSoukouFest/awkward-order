import { DEFAULT_ENDPOINT, LatimeriaAssetsClient } from "./assets-proxy-client";
import { loadLatimeriaConfig } from "./config";
import { DEFAULT_SYNC_FILE_REGEXP } from "./sync";
import { AssetsProxySyncAgent } from "./sync/assets-proxy";
import { resolve_path_from_cwd } from "./utilities";

/**
 * The handler
 */
export async function assetsProxyHandler(): Promise<void> {
	const config = await loadLatimeriaConfig();
	if (!config.assets.accessToken) {
		throw new Error(
			"Assets Proxy access token is not configured. Please set it in the configuration file. (assets.accessToken)",
		);
	}
	const endpoint = config.assets.endpoint ?? DEFAULT_ENDPOINT;
	const syncDirectory = config.assets.syncDir ?? config.drive.syncDir;
	const client = new LatimeriaAssetsClient(config.assets.accessToken, endpoint);
	for (const directory of syncDirectory) {
		const resolveSyncDirectory = resolve_path_from_cwd(directory);
		const agent = new AssetsProxySyncAgent({
			matchRule: DEFAULT_SYNC_FILE_REGEXP,
			realSyncPath: resolveSyncDirectory,
		});
		await agent.setup();
		await agent.sync(client, "upload");
	}
}
