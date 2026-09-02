// Servidor estatico sin dependencias.
// Azure App Service (Linux, NODE|22-lts) ejecuta `npm start` y expone process.env.PORT.
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 8080;
const ROOT = path.join(__dirname, "public");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2"
};

function resolve(urlPath) {
  // Normaliza y bloquea path traversal.
  const raw = decodeURIComponent(urlPath.split("?")[0]);
  const clean = path.posix.normalize(raw.split(path.sep).join("/"));
  if (clean.includes("..")) return null;
  let target = path.join(ROOT, clean);
  if (!target.startsWith(ROOT)) return null;
  if (clean === "/") return path.join(ROOT, "index.html");
  if (fs.existsSync(target) && fs.statSync(target).isDirectory()) target = path.join(target, "index.html");
  if (fs.existsSync(target)) return target;
  // URLs limpias: /marketplace -> public/marketplace.html
  if (!path.extname(target) && fs.existsSync(target + ".html")) return target + ".html";
  return null;
}

const server = http.createServer((req, res) => {
  if (req.url === "/healthz") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ status: "ok", uptime: process.uptime() }));
  }

  const file = resolve(req.url);
  if (!file) {
    const notFound = path.join(ROOT, "404.html");
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    return res.end(fs.existsSync(notFound) ? fs.readFileSync(notFound) : "404");
  }

  const ext = path.extname(file).toLowerCase();
  const cache = ext === ".html" ? "no-cache" : "public, max-age=3600";
  res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream", "Cache-Control": cache });
  fs.createReadStream(file).pipe(res);
});

server.listen(PORT, () => console.log(`training-web escuchando en :${PORT}`));
