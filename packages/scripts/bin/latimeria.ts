#!/usr/bin/env node

import { defineCommand, runMain } from "citty";
import {
	assetsProxyHandler,
	authorize,
	authorizeAuto,
	driveHandler,
	productCompile,
	programMigrate,
} from "../src";

const Product = defineCommand({
	meta: {
		name: "Manage Products",
	},
	args: {
		inputPath: {
			type: "string",
		},
		outputPath: {
			type: "string",
		},
	},
	run({ args }) {
		productCompile(args.inputPath, args.outputPath).catch(console.error);
	},
});

const Program = defineCommand({
	meta: {
		name: "Manage Programs",
	},
	args: {
		inputPath: {
			type: "string",
		},
		outputPath: {
			type: "string",
			required: false,
		},
	},
	run({ args }) {
		programMigrate(args.inputPath, args.outputPath).catch(console.error);
	},
});

const AssetsProxy = defineCommand({
	meta: {
		name: "Assets Proxy Syncer",
	},
	args: {},
	run() {
		assetsProxyHandler().catch(console.error);
	},
});

const GDrive = defineCommand({
	meta: {
		name: "Google Drive Syncer",
	},
	args: {
		driveId: {
			type: "string",
		},
		syncDir: {
			type: "string",
		},
		force: {
			type: "boolean",
			default: false,
		},
		noOAuth: {
			type: "boolean",
			default: false,
		},
	},
	run({ args }) {
		if (args.noOAuth) {
			authorizeAuto()
				.then((v) => driveHandler(v, args.force))
				.catch(console.error);
		} else {
			authorize()
				.then((v) => driveHandler(v, args.force))
				.catch(console.error);
		}
	},
});

const app = defineCommand({
	meta: {
		name: "Latimeria Cli Tool",
	},
	subCommands: {
		gdrive: GDrive,
		assets: AssetsProxy,
		product: Product,
		program: Program,
	},
});

await runMain(app);
