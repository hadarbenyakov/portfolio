import { existsSync } from "node:fs";
import { join } from "node:path";

/**
 * True when a file exists under /public. Lets a server component render a real
 * <video> once the recording is dropped in, and a labelled slot until then —
 * no code change needed when the file lands.
 */
export function hasPublicAsset(publicPath: string): boolean {
  return existsSync(join(process.cwd(), "public", publicPath.replace(/^\//, "")));
}
