import { ReactNode, useEffect } from "react";
import { renderToString } from "react-dom/server";
import Document from "../components/Document";

export const App = (): ReactNode => {
	useEffect(() => {
		console.log("wowza");
	}, []);
	return <span>OK</span>;
};

export const get = () =>
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
	);
