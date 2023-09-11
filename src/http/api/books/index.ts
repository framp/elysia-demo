import { TypedSchema, t } from "elysia";
import { GetHandler, PostHandler } from "../../..";
import { WithBody } from "../../../utils";
import { bookSchema } from "../../../models/book";

export const get: GetHandler = ({ getDb }) => {
	const db = getDb();
	return db.book.findMany();
};

export const post: {
	handler: WithBody<typeof bookSchema, PostHandler>;
	hooks: TypedSchema;
} = {
	handler: ({ getDb, body }) => {
		const db = getDb();
		return db.book.create({ data: body });
	},
	hooks: {
		body: bookSchema,
	},
};
