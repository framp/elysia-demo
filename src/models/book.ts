import { t } from "elysia";

export const bookSchema = t.Object({
	name: t.String(),
	author: t.String(),
	description: t.String(),
	thumbnail: t.String(),
});

export type Book = {
	id: number;
	name: string;
	author: string;
	description: string;
	thumbnail: string;
};
