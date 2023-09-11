import { hydrateRoot } from "react-dom/client";
import { App } from "../http/trpc";

hydrateRoot(document.getElementById("root"), <App />);
