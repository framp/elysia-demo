import { bookSchema } from "../../models/book";

import { AppWithDatabase } from "../..";

export default (app: AppWithDatabase) =>
	app
		.get("/api/books", ({ getDb }) => {
			const db = getDb();
			return db.book.findMany();
		})
		.post(
			"/api/books",
			({ getDb, body }) => {
				const db = getDb();
				return db.book.create({ data: body });
			},
			{ body: bookSchema },
		);
