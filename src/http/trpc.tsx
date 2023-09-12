import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { ReactNode } from "react";
import { renderToString } from "react-dom/server";
import { Toaster } from "react-hot-toast";
import type { ElysiaApp } from "..";
import BookApp from "../components/BookApp";
import Document from "../components/Document";
import { origin } from "../config";
import { Book } from "../models/book";
import type { Router } from "../trpc";

const client = createTRPCProxyClient<Router>({
	links: [
		httpBatchLink({
			url: `${origin}/trpc`,
		}),
	],
});
export const App = (): ReactNode => {
	const bookAppProps = {
		listBooks: async () => client.listBooks.query(),
		deleteBook: async (id: number) => {
			client.deleteBook.mutate({ id });
		},
		createBook: async (book: Omit<Book, "id">) => {
			client.createBook.mutate({ book });
		},
		updateBook: async (id: number, book: Omit<Book, "id">) => {
			client.updateBook.mutate({ id, book });
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
					<Document name="trpc" title="tRPC Demo">
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
