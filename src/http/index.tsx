import Elysia from "elysia";
import { ReactElement } from "react";
import { renderToString } from "react-dom/server";
import Document from "../components/Document";
import edenPage from "./eden";
import trpcPage from "./trpc";

export const App = () => (
	<>
		<link rel="stylesheet" type="text/css" href="/public/fancy.css" />
		<img src="/public/lion.svg" alt="A random cartoon of a lion super hero" />
		<h1>Hello World</h1>
		<div className="links">
			<a href="/swagger">Swagger</a>
			<a href="/graphql">GraphQL</a>
			<a href="/eden">Eden</a>
			<a href="/trpc">tRPC</a>
		</div>
	</>
);

const indexPage = (app: Elysia) =>
	app.get(
		"/",
		() =>
			new Response(
				renderToString(
					<Document name="index" title="Elysia Hello World">
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

export default (app: Elysia) => app.use(indexPage).use(edenPage).use(trpcPage);
