import { Hono } from "hono";
import { bearerAuth } from "hono/bearer-auth";
import { describeRoute, openAPISpecs } from "hono-openapi";
import { resolver, validator as vValidator } from "hono-openapi/valibot";
import * as v from "valibot";

type Binding = {
	BUCKET: R2Bucket;
	IMAGES: ImagesBinding;
	API_TOKEN: string;
};

const app = new Hono<{
	Bindings: Binding;
}>();

app.get("/image/*", async (c, next) => {
	const cacheKey = c.req.url;
	const cache = caches.default;
	const cachedResponse = await cache.match(cacheKey);
	if (cachedResponse) {
		return cachedResponse;
	}
	await next();
	if (!c.res.ok) {
		return;
	}
	c.header("Cache-Control", "s-maxage=60");
	const response = c.res.clone();
	c.executionCtx.waitUntil(cache.put(cacheKey, response));
});

const getImageQuerySchema = v.object({
	width: v.optional(v.string()),
	quality: v.optional(v.string()),
	format: v.picklist([
		"image/jpeg",
		"image/png",
		"image/gif",
		"image/webp",
		"image/avif",
		"rgb",
		"rgba",
		"auto",
	]),
});

app.get(
	"/image/:id",
	describeRoute({
		summary: "Get an image by ID",
		description:
			"Retrieve an image from the bucket by its ID, with optional transformations.",
		responses: {
			200: {
				description: "The requested image, possibly transformed.",
				content: {
					"image/jpeg": {},
				},
			},
			404: { description: "Image not found." },
		},
	}),
	vValidator("query", getImageQuerySchema),
	async (c) => {
		const id = c.req.param("id");
		let { format } = c.req.valid("query");
		const { quality, width } = c.req.valid("query");
		if (format === "auto") {
			const accept = c.req.header().accept || "";

			if (/image\/avif/.test(accept)) {
				format = "image/avif";
			} else {
				format = "image/webp";
			}
		}
		const object = await c.env.BUCKET.get(id);
		if (!object) {
			return c.notFound();
		}
		// @ts-expect-error quality and width are number
		const optimizePipe = await c.env.IMAGES.input(object.body)
			.transform({ width })
			.transform({ quality })
			.output({ format });
		const optimized = optimizePipe.response();
		const headers: Record<string, string> = {
			"Content-Type":
				optimized.headers.get("Content-Type") || format || "image/jpeg",
		};
		const body = await optimized.arrayBuffer();
		return c.body(body, 200, headers);
	},
);

const imageUploadSchema = v.object({
	file: v.file(),
	name: v.string(),
});

const imageUploadResponseSchema = v.object({
	key: v.string(),
	version: v.string(),
	size: v.number(),
	etag: v.string(),
	httpEtag: v.string(),
	checksums: v.object({
		md5: v.optional(v.string()),
		sha1: v.optional(v.string()),
		sha256: v.optional(v.string()),
		sha384: v.optional(v.string()),
		sha512: v.optional(v.string()),
	}),
	uploaded: v.string(),
	httpMetadata: v.object({
		contentType: v.optional(v.string()),
		contentLanguage: v.optional(v.string()),
		contentDisposition: v.optional(v.string()),
		contentEncoding: v.optional(v.string()),
		cacheControl: v.optional(v.string()),
		cacheExpiry: v.optional(v.string()),
	}),
	customMetadata: v.optional(v.record(v.string(), v.string())),
	range: v.optional(v.record(v.string(), v.string())),
	storageClass: v.string(),
	ssecKeyMd5: v.optional(v.string()),
});

app.use(
	"/upload",
	bearerAuth({
		verifyToken: async (token, c) => {
			return token === c.env.API_TOKEN;
		},
	}),
);

app.post(
	"/upload",
	describeRoute({
		hide: process.env.NODE_ENV === "production",
		summary: "Upload an image",
		description:
			"Upload an image to the bucket. The image can be transformed using the `GET /image/:id` endpoint.",
		responses: {
			200: {
				description: "The requested image, possibly transformed.",
				content: {
					"application/json": { schema: resolver(imageUploadResponseSchema) },
				},
			},
			404: { description: "Image not found." },
		},
	}),
	vValidator("form", imageUploadSchema),
	async (c) => {
		const { name, file } = c.req.valid("form");
		const result = await c.env.BUCKET.put(name, file, {
			httpMetadata: {
				contentType: file.type,
			},
		});
		return c.json(result);
	},
);

app.get(
	"/openapi",
	openAPISpecs(app, {
		documentation: {
			info: {
				title: "Latimeria Assets Proxy API",
				version: "0.1.0",
				description: "Greeting API",
			},
			servers: [{ url: "http://localhost:8787", description: "Local Server" }],
		},
	}),
);

export default app;
