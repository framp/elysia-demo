import { swagger } from "@elysiajs/swagger";
import { Elysia, t } from "elysia";

import { apollo } from "@elysiajs/apollo";
import { bearer } from "@elysiajs/bearer";
import { cookie } from "@elysiajs/cookie";
import { cors } from "@elysiajs/cors";
import { edenTreaty } from "@elysiajs/eden";
import { jwt } from "@elysiajs/jwt";
import staticPlugin from "@elysiajs/static";
import { trpc } from "@elysiajs/trpc";
import { autoroutes } from "elysia-autoroutes";
import * as pack from "../package.json";
import { resolvers, typeDefs } from "./graphql";
import router from "./trpc";
import database from "./plugins/database";
import cache from "./plugins/cache";

export const app = new Elysia()
	.use(await database())
	// .use(await cache())
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
	.use(autoroutes({ routesDir: "./http" }))
	.use(
		apollo({
			typeDefs,
			resolvers,
		}),
	)
	.use(trpc(router))
	.use(staticPlugin())
	.listen(1337);

export type ElysiaApp = typeof app;
export type GetHandler = Parameters<typeof app.get>[1];
export type PostHandler = Parameters<typeof app.post>[1];
export type PutHandler = Parameters<typeof app.put>[1];
export type DelHandler = Parameters<typeof app.delete>[1];
export type Hooks = Parameters<typeof app.get>[2];


console.log(
	`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
);
