import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..", "docs");
const port = Number(process.env.PORT || 4173);

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
};

function resolveFilePath(requestPath) {
  const safePath = requestPath === "/" ? "/index.html" : requestPath;
  const normalized = path
    .normalize(decodeURIComponent(safePath))
    .replace(/^(\.\.[/\\])+/, "");

  return path.join(root, normalized);
}

const server = http.createServer(async (req, res) => {
  try {
    const filePath = resolveFilePath(req.url || "/");
    const stat = await fs.stat(filePath).catch(() => null);

    if (!stat || stat.isDirectory()) {
      const html = await fs.readFile(path.join(root, "index.html"));
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(html);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const type = contentTypes[ext] || "application/octet-stream";
    const body = await fs.readFile(filePath);

    res.writeHead(200, { "Content-Type": type });
    res.end(body);
  } catch (error) {
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end(`Unable to load docs: ${error.message}`);
  }
});

server.listen(port, () => {
  console.log(`Vite Forge docs available at http://localhost:${port}`);
});
