import { t } from "elysia";
import { bookSchema } from "../../../models/book";

import { ElysiaApp } from "../../..";

export default (app: ElysiaApp) =>
	app
		.get("/", ({ getDb }) => {
			const db = getDb();
			return db.book.findMany();
		})
		.post(
			"/",
			({ getDb, body }) => {
				const db = getDb();
				return db.book.create({ data: body });
			},
			{ body: bookSchema },
		);
