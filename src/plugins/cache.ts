import { createClient } from "redis";
import Elysia from "elysia";

export default async () => {
	const cache = createClient();
	await cache.connect();
	return (app: Elysia) => app.decorate("getCache", () => cache);
};
