import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// Turbopack bundles this config and evaluates it from .next/, so import.meta.url
// cannot be used to locate project files. cwd is the project root.
const breakpointsPath = join(process.cwd(), 'src/styles/breakpoints.css');

/**
 * postcss-custom-media v12 dropped `importFrom`, so @custom-media rules only
 * resolve within the file that declares them. This prepends the shared
 * breakpoint declarations to every stylesheet so each CSS Module can use
 * `@media (--tablet)` while breakpoints.css stays the single source of truth.
 */
const injectBreakpoints = () => ({
  postcssPlugin: 'inject-breakpoints',
  Once(root, { parse }) {
    if (root.source?.input?.file === breakpointsPath) return;
    root.prepend(parse(readFileSync(breakpointsPath, 'utf8')).nodes);
  },
});
injectBreakpoints.postcss = true;

const config = {
  plugins: [injectBreakpoints(), 'postcss-custom-media'],
};

export default config;
