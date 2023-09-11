import { TypedSchema } from "elysia";
import { GetHandler, PutHandler } from "../../..";
import { WithBody, WithParams } from "../../../utils";
import { bookSchema } from "../../../models/book";

export const get: WithParams<{ id: string }, GetHandler> = ({
	getDb,
	params,
}) => {
	const db = getDb();
	return db.book.findUnique({
		where: { id: Number(params.id) },
	});
};

export const put: {
	handler: WithBody<typeof bookSchema, WithParams<{ id: string }, PutHandler>>;
	hooks: TypedSchema;
} = {
	handler: ({ getDb, params, body }) => {
		const db = getDb();
		return db.book.update({
			where: { id: Number(params.id) },
			data: body,
		});
	},
	hooks: { body: bookSchema },
};

export const del: WithParams<{ id: string }, PutHandler> = ({
	getDb,
	params,
}) => {
	const db = getDb();
	return db.book.delete({
		where: { id: Number(params.id) },
	});
};
