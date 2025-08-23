import path from "node:path";
import process from "node:process";

/**
 * 実行されているディレクトリから絶対パスを取得
 */
export function resolve_path_from_cwd(absolve_path: string): string {
	return path.join(process.cwd(), absolve_path);
}
