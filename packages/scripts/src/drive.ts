import type {
	BaseExternalAccountClient,
	OAuth2Client,
} from "google-auth-library";
import { google } from "googleapis";
import { loadLatimeriaConfig } from "./config";
import { DEFAULT_SYNC_FILE_REGEXP, DriveSyncAgent } from "./sync";
import { resolve_path_from_cwd } from "./utilities";

const DEFAULT_DRIVE_ID = "1ubSpJEvVoAgLNaM3FL_sdrtP3BB5lRMz";

/**
 * The handler
 */
export async function driveHandler(
	authClient: OAuth2Client | BaseExternalAccountClient,
	force: boolean,
): Promise<void> {
	const drive = google.drive({ version: "v3", auth: authClient });
	const config = await loadLatimeriaConfig();
	console.log("config loaded");
	for (const driveId of config.drive.driveIds ?? [DEFAULT_DRIVE_ID]) {
		for (const directory of config.drive.syncDir) {
			const resolveSyncDirectory = resolve_path_from_cwd(directory);
			const agent = new DriveSyncAgent({
				folderID: driveId,
				force: force,
				matchRule: DEFAULT_SYNC_FILE_REGEXP,
				realSyncPath: resolveSyncDirectory,
			});
			await agent.setup();
			await agent.sync(drive, "download");
		}
	}
}
