import { t } from "elysia";
import { bookSchema } from "../../models/book";

import { AppWithDatabase } from "../..";
const params = t.Object({ id: t.String() });

export default (app: AppWithDatabase) =>
	app
		.get(
			"/api/books/:id",
			({ getDb, params }) => {
				const db = getDb();
				return db.book.findUnique({
					where: { id: Number(params.id) },
				});
			},
			{
				params,
			},
		)
		.put(
			"/api/books/:id",
			({ getDb, params, body }) => {
				const db = getDb();
				return db.book.update({
					where: { id: Number(params.id) },
					data: body,
				});
			},
			{ params, body: bookSchema },
		)
		.delete(
			"/api/books/:id",
			({ getDb, params }) => {
				const db = getDb();
				return db.book.delete({
					where: { id: Number(params.id) },
				});
			},
			{ params },
		);
