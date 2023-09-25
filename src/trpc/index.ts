import { trpc } from "@elysiajs/trpc";
import { initTRPC } from "@trpc/server";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { z as t } from "zod";
import { db } from "../plugins/database";

export const createContext = async (opts: FetchCreateContextFnOptions) => ({
	getDb: () => db,
});

const bookSchema = t.object({
	name: t.string(),
	author: t.string(),
	description: t.string(),
	thumbnail: t.string(),
});

const trpcClient = initTRPC
	.context<Awaited<ReturnType<typeof createContext>>>()
	.create();

const router = trpcClient.router({
	listBooks: trpcClient.procedure.query(({ ctx }) => {
		const db = ctx.getDb();
		return db.book.findMany();
	}),
	getBook: trpcClient.procedure
		.input(t.object({ id: t.number() }))
		.query(({ input, ctx }) => {
			const db = ctx.getDb();
			return db.book.findUnique({ where: { id: Number(input.id) } });
		}),
	deleteBook: trpcClient.procedure
		.input(t.object({ id: t.number() }))
		.mutation(({ input, ctx }) => {
			const db = ctx.getDb();
			return db.book.delete({ where: { id: Number(input.id) } });
		}),
	createBook: trpcClient.procedure
		.input(t.object({ book: bookSchema }))
		.mutation(({ input, ctx }) => {
			const db = ctx.getDb();
			return db.book.create({ data: input.book });
		}),
	updateBook: trpcClient.procedure
		.input(t.object({ id: t.number(), book: bookSchema }))
		.mutation(({ input, ctx }) => {
			const db = ctx.getDb();
			return db.book.update({
				where: { id: Number(input.id) },
				data: input.book,
			});
		}),
});

export type Router = typeof router;

export default trpc(router, { createContext });
