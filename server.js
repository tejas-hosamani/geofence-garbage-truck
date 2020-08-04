const envVars = require("dotenv").config();
const express = require("express");
const next = require("next");
const bodyParser = require("body-parser");

if (envVars.error) {
  throw envVars.error;
}

const PORT = parseInt(process.env.PORT, 10) || 5050;

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(bodyParser.json());

  // server.get("/a", (req, res) => {
  //   return app.render(req, res, "/a", req.query);
  // });

  // server.get("/b", (req, res) => {
  //   return app.render(req, res, "/b", req.query);
  // });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(PORT, err => {
    if (err) {
      throw err;
    }
    // eslint-disable-next-line no-console
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
