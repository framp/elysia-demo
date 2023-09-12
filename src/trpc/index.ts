import { compile } from "@elysiajs/trpc";
import { initTRPC } from "@trpc/server";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { t } from "elysia";
import { bookSchema } from "../models/book";
import { db } from "../plugins/database";

export const createContext = async (opts: FetchCreateContextFnOptions) => ({
	getDb: () => db,
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
		.input(compile(t.Object({ id: t.Number() })))
		.query(({ input, ctx }) => {
			const db = ctx.getDb();
			return db.book.findUnique({ where: { id: Number(input.id) } });
		}),
	deleteBook: trpcClient.procedure
		.input(compile(t.Object({ id: t.Number() })))
		.mutation(({ input, ctx }) => {
			const db = ctx.getDb();
			return db.book.delete({ where: { id: Number(input.id) } });
		}),
	createBook: trpcClient.procedure
		.input(compile(t.Object({ book: bookSchema })))
		.mutation(({ input, ctx }) => {
			const db = ctx.getDb();
			return db.book.create({ data: input.book });
		}),
	updateBook: trpcClient.procedure
		.input(compile(t.Object({ id: t.Number(), book: bookSchema })))
		.mutation(({ input, ctx }) => {
			const db = ctx.getDb();
			return db.book.update({
				where: { id: Number(input.id) },
				data: input.book,
			});
		}),
});

export type Router = typeof router;

export default router;
