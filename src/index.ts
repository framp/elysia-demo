import { Elysia } from "elysia";

import { bearer } from "@elysiajs/bearer";
import { cookie } from "@elysiajs/cookie";
import { cors } from "@elysiajs/cors";
import { jwt } from "@elysiajs/jwt";
import { autoroutes } from "elysia-autoroutes";

import apollo from "@elysiajs/apollo";
import staticPlugin from "@elysiajs/static";
import { swagger } from "@elysiajs/swagger";
import { trpc } from "@elysiajs/trpc";
import * as pack from "../package.json";
import { port } from "./config";
import { resolvers, typeDefs } from "./graphql";
import cache from "./plugins/cache";
import database from "./plugins/database";
import router, { createContext } from "./trpc";

export const app = new Elysia()
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
	.use(await database())
	// .use(await cache())
	.use(
		apollo({
			typeDefs,
			resolvers,
		}),
	)
	.use(trpc(router, { createContext }))
	.use(autoroutes({ routesDir: "./http" }))
	.use(staticPlugin())
	.listen(port);

export type ElysiaApp = typeof app;

console.log(
	`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
);
