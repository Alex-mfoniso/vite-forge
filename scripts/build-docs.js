import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const source = path.join(root, "docs");
const output = path.join(root, "dist");

await fs.rm(output, { recursive: true, force: true });
await fs.mkdir(output, { recursive: true });
await fs.cp(source, output, { recursive: true });

console.log("Docs site built to dist/");
