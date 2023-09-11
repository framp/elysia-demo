import { renderToString } from "react-dom/server";
import Document from "../components/Document";

export const App = () => {
	return <span>OK</span>;
};

export const get = () =>
	new Response(
		renderToString(
			<Document name="trpc" title="TRPC Demo">
				<App />
			</Document>,
		),
		{
			headers: {
				"content-type": "text/html; charset=utf8",
			},
		},
	);
