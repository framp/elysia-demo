import { Elysia } from "elysia";

import staticPlugin from "@elysiajs/static";
import { swagger } from "@elysiajs/swagger";
import * as pack from "../package.json";
import api from "./api";
import { port } from "./config";
import graphql from "./graphql";
import http from "./http";
import database from "./plugins/database";
import trpc from "./trpc";

export const appWithDatabase = new Elysia().use(await database());
export type AppWithDatabase = typeof appWithDatabase;
export const appWithApi = appWithDatabase.use(api);
export type AppWithApi = typeof appWithApi;

export const app = appWithApi
	.use(
		swagger({
			documentation: {
				info: {
					title: "Elysia Demo",
					version: pack.version,
				},
			},
		}),
	)
	.use(graphql)
	.use(trpc)
	.use(http)
	.use(staticPlugin())
	.listen(port);

export type App = typeof app;

console.log(
	`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
);
