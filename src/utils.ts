import { UnwrapSchema } from "elysia";
import type { TSchema } from "@sinclair/typebox";

export type WithParams<Params, Handler extends (...args: any) => any> = (
	ctx: Parameters<Handler>[0] & { params: Params },
) => ReturnType<Handler>;

export type WithBody<
	BodySchema extends string | TSchema | undefined,
	Handler extends (...args: any) => any,
> = (
	ctx: Parameters<Handler>[0] & { body: UnwrapSchema<BodySchema> },
) => ReturnType<Handler>;
