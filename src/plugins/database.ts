import { PrismaClient } from "@prisma/client";
import Elysia, { ElysiaInstance } from "elysia";

export default async () => {
	const db = new PrismaClient();
	return (app: Elysia) => app.decorate("getDb", () => db);
};
