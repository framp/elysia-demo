import { compile } from "@elysiajs/trpc";
import { initTRPC } from "@trpc/server";
import { t } from "elysia";

const trpcClient = initTRPC.create();

const router = trpcClient.router({
	greet: trpcClient.procedure
		.input(compile(t.String()))
		.query(({ input }) => `hello ${input}`),
});

export type Router = typeof router;

export default router;
