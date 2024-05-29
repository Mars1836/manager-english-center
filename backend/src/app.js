const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const router = require("./routes");
const cors = require("cors");
require("./dbs/mongodb.connect");
const app = express();
const port = 3000;
app.use(morgan("dev"));
app.use(helmet());

// Use CORS middleware
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/", router);
module.exports = app;
