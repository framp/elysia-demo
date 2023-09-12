import { PrismaClient } from "@prisma/client";
import Elysia from "elysia";

export const db = new PrismaClient();

export default async () => {
	return (app: Elysia) => app.decorate("getDb", () => db);
};
