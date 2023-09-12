import { t } from "elysia";
import { bookSchema } from "../../../models/book";

import { ElysiaApp } from "../../..";

const params = t.Object({ id: t.String() });

export default (app: ElysiaApp) =>
	app
		.get(
			"/",
			({ getDb, params }) => {
				const db = getDb();
				return db.book.findUnique({
					where: { id: Number(params.id) },
				});
			},
			{ params },
		)
		.put(
			"/",
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
			"/",
			({ getDb, params }) => {
				const db = getDb();
				return db.book.delete({
					where: { id: Number(params.id) },
				});
			},
			{ params },
		);
