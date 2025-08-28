import createClient, { type Client, type Middleware } from "openapi-fetch";
import type { paths } from "./generated/assets-proxy";

export const DEFAULT_ENDPOINT = "https://assets-proxy.kanium.workers.dev";

type UploadSuccessResponse =
	paths["/upload"]["post"]["responses"][200]["content"]["application/json"];

export class LatimeriaAssetsClient {
	endpoint: string;
	private assetProxyClient: Client<paths, `${string}/${string}`>;

	constructor(accessToken: string, endpoint?: string) {
		this.endpoint = endpoint ?? DEFAULT_ENDPOINT;
		this.assetProxyClient = createClient<paths>({ baseUrl: DEFAULT_ENDPOINT });
		const authMiddleware: Middleware = {
			async onRequest({ request }) {
				request.headers.set("Authorization", `Bearer ${accessToken}`);
				return request;
			},
		};
		this.assetProxyClient.use(authMiddleware);
	}

	async uploadAssets(
		file: File,
		name: string,
	): Promise<UploadSuccessResponse | undefined> {
		const { data, error } = await this.assetProxyClient.POST("/upload", {
			body: {
				file: file.slice(),
				name: name,
			},
			bodySerializer(body) {
				const data = new FormData();
				if (!body) {
					throw new Error("Body is required for upload");
				}
				data.append("file", body?.file as Blob);
				data.append("name", body?.name);
				return data;
			},
		});
		if (error) {
			throw new Error(`Upload failed: ${error}`);
		}
		return data;
	}
}
