import { edenTreaty } from "@elysiajs/eden";
import { Theme } from "@radix-ui/themes";

import "@radix-ui/themes/styles.css";
import { ReactNode } from "react";
import { renderToString } from "react-dom/server";
import { Toaster } from "react-hot-toast";
import type { ElysiaApp } from "..";
import BookApp from "../components/BookApp";
import Document from "../components/Document";
import { origin } from "../config";
import { Book } from "../models/book";

const app = edenTreaty<ElysiaApp>(origin);

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
				return data;
			}
		},
		createBook: async (book: Omit<Book, "id">) => {
			const { data, error } = await app.api.books.post(book);

			if (error) {
				throw error;
			} else {
				return data;
			}
		},
		updateBook: async (id: number, book: Omit<Book, "id">) => {
			const { data, error } = await app.api.books[id].put(book);
			if (error) {
				throw error;
			} else {
				return data;
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
export default (app: ElysiaApp) =>
	app.get(
		"/",
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
