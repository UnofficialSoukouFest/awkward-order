// If modifying these scopes, delete token.json.

import fs from "node:fs/promises";
import { authenticate } from "@google-cloud/local-auth";
import {
	type BaseExternalAccountClient,
	GoogleAuth,
	type OAuth2Client,
} from "google-auth-library";
import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/drive"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = "token.json";
const CREDENTIALS_PATH = "credentials.json";

/**
 * Reads previously authorized credentials from the save file.
 */
async function loadSavedCredentialsIfExist(): Promise<
	OAuth2Client | undefined
> {
	try {
		const content = await fs.readFile(TOKEN_PATH, { encoding: "utf8" });
		const credentials = JSON.parse(content);
		return google.auth.fromJSON(credentials) as OAuth2Client;
	} catch (error) {
		console.error(error);
	}
}

/**
 * Serializes credentials to a file compatible with GoogleAuth.fromJSON.
 */
async function saveCredentials(client: OAuth2Client): Promise<void> {
	const content = await fs.readFile(CREDENTIALS_PATH, { encoding: "utf8" });
	const keys = JSON.parse(content);
	const key = keys.installed || keys.web;
	const payload = JSON.stringify({
		type: "authorized_user",
		client_id: key.client_id,
		client_secret: key.client_secret,
		refresh_token: client.credentials.refresh_token,
	});
	await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 */
export async function authorize(): Promise<OAuth2Client> {
	let client = await loadSavedCredentialsIfExist();
	if (client) {
		return client;
	}
	client = (await authenticate({
		scopes: SCOPES,
		keyfilePath: CREDENTIALS_PATH,
	})) as OAuth2Client;
	if (client.credentials) {
		await saveCredentials(client);
	}
	return client;
}

/**
 * Load or request or authorization to call APIs.
 */
export async function authorizeAuto(): Promise<
	OAuth2Client | BaseExternalAccountClient
> {
	const auth = new GoogleAuth({
		scopes: SCOPES,
	});
	return auth.getClient() as Promise<OAuth2Client | BaseExternalAccountClient>;
}
