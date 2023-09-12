import { JSX } from "react";

export type DocumentProps = {
	children: JSX.Element;
	name: string;
	title: string;
};

export default (props: DocumentProps) => (
	<html lang="en">
		<head>
			<title>{props.title}</title>
			{/* <link rel="stylesheet" type="text/css" href="/public/fancy.css" /> */}
			<link
				rel="stylesheet"
				type="text/css"
				href="/public/js/styles-afcee62e3d68e96d.css"
			/>
		</head>
		<body>
			<div id="root">{props.children}</div>
			<script type="module" src={`/public/js/${props.name}.js`} />
		</body>
	</html>
);
