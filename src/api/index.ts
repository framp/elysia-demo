import Elysia from "elysia";
import booksApi from "./books";
import bookApi from "./books/[id]";

export default (app: Elysia) => app.use(booksApi).use(bookApi);
