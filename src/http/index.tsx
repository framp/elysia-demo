import { ReactNode, useEffect } from "react";
import { renderToString } from "react-dom/server";
import Document from "../components/Document";

export const App = () => (
	<>
		<img src="/public/lion.svg" alt="A random cartoon of a lion super hero" />
		<h1>Hello World</h1>
		<div className="links">
			<a href="/swagger">Swagger</a>
			<a href="/graphql">GraphQL</a>
			<a href="/eden">Eden</a>
			<a href="/trpc">TRPC</a>
		</div>
	</>
);

export const get = () =>
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
	);
