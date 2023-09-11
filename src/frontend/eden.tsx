import { hydrateRoot } from "react-dom/client";
import { App } from "../http/eden";

hydrateRoot(document.getElementById("root"), (() => <App />)());
