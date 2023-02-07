const { createServer } = require("https");
const { parse } = require("url");
const next = require("next");
const fs = require("fs");

const dev = process.env.NODE_ENV !== "production";
const port = 443;
const app = next({ dev, port });
const handle = app.getRequestHandler();

const httpsOptions = {
     key: fs.readFileSync("./certificate/dev.realdevsquad.com+1-key.pem"),
     cert: fs.readFileSync("./certificate/dev.realdevsquad.com+1.pem"),
};

app.prepare().then(() => {
     createServer(httpsOptions, (req, res) => {
          const parseUrl = parse(req.url, true);
          handle(req, res, parseUrl);
     }).listen(port);

     console.log(
          `Server listening at https://localhost:${port} as ${dev ? "development" : process.env.NODE_ENV
          }`
     );
});