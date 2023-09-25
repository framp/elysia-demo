import Elysia from "elysia";

export default (app: Elysia) => app.get("/", () => ({ hello: "world" }));
