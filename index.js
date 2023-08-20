const fs = require("fs");
const path = require("path");
const http = require("http");

const server = http.createServer((req, res) => {
	const filepath = path.join(
		__dirname,
		req.url === "/" ? "index.html" : `${req.url}.html`
	);
	fs.readFile(filepath, (err, content) => {
		if (err) {
			if (err.code === "ENOENT") {
				fs.readFile(path.join(__dirname, "404.html"), (err, content) => {
					res.writeHead(200, { "Content-Type": "text/html" });
					res.end(content, "utf8");
				});
			} else {
				res.writeHead(500);
				res.end(`Server Error: ${err.code}`);
			}
		} else {
			res.writeHead(200, { "Content-Type": "text/html" });
			res.end(content, "utf8");
		}
	});
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log("Server running at port", PORT));
