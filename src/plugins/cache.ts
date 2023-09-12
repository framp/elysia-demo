import Elysia from "elysia";
import { createClient } from "redis";

export default async () => {
	const cache = createClient();
	await cache.connect();
	return (app: Elysia) => app.decorate("getCache", () => cache);
};
