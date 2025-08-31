import type { DrizzleD1Database } from "drizzle-orm/d1";
import type * as schema from "~/schema";

export type DBClient = DrizzleD1Database<typeof schema> & {
	$client: D1Database;
};

/**
 * Rust-likeな例外が投げられる可能性のあることを表現する型です
 */
export type Result<T = unknown> = Ok<T> | Err;

export type Ok<T> = {
	type: "ok";
	payload: T;
};

export type Err = {
	type: "error";
	payload: Error;
};

export const Ok = <T>(payload: T): Ok<T> => {
	return {
		type: "ok",
		payload: payload,
	};
};

export const Err = (payload: Error): Err => {
	return {
		type: "error",
		payload: payload,
	};
};

/**
 * Resultに入っている値を取り出す関数です
 * 仮に`Err`だった場合は例外が投げられます
 */
export function unwrap<T>(result: Result<T>): T {
	if (result.type === "ok") {
		return result.payload;
	} else {
		throw result.payload;
	}
}

export const isErr = <T>(result: Result<T>): boolean => result.type === "error";
export const isOk = <T>(result: Result<T>): boolean => result.type === "ok";
