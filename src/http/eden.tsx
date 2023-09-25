import { edenTreaty } from "@elysiajs/eden";
import { Theme } from "@radix-ui/themes";

import "@radix-ui/themes/styles.css";
import Elysia from "elysia";
import { ReactNode } from "react";
import { renderToString } from "react-dom/server";
import { Toaster } from "react-hot-toast";
import type { AppWithApi } from "..";
import BookApp from "../components/BookApp";
import Document from "../components/Document";
import { origin } from "../config";
import { Book } from "../models/book";

const app = edenTreaty<AppWithApi>(origin);

export const App = (): ReactNode => {
	const bookAppProps = {
		listBooks: async () => {
			const { data, error } = await app.api.books.get();
			if (error) {
				throw error;
			} else {
				return data;
			}
		},
		deleteBook: async (id: number) => {
			const { data, error } = await app.api.books[id].delete();
			if (error) {
				throw error;
			} else {
				return;
			}
		},
		createBook: async (book: Omit<Book, "id">) => {
			const { data, error } = await app.api.books.post(book);

			if (error) {
				throw error;
			} else {
				return;
			}
		},
		updateBook: async (id: number, book: Omit<Book, "id">) => {
			const { data, error } = await app.api.books[id].put(book);
			if (error) {
				throw error;
			} else {
				return;
			}
		},
	};

	return (
		<>
			<Theme>
				<BookApp {...bookAppProps} />
				<Toaster position="bottom-center" />
			</Theme>
		</>
	);
};
export default (app: Elysia) =>
	app.get(
		"/eden",
		() =>
			new Response(
				renderToString(
					<Document name="eden" title="Eden Demo">
						<App />
					</Document>,
				),
				{
					headers: {
						"content-type": "text/html; charset=utf8",
					},
				},
			),
	);
