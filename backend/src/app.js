const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
require("../dbs/mongodb.connect");
const app = express();
const port = 3000;
app.use(morgan("dev"));
app.use(helmet());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
module.exports = app;
