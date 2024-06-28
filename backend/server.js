const app = require("./src/app");
require("dotenv").config();
const server = app.listen(process.env.DEV_PORT, () => {
  console.log("server running in port : " + process.env.DEV_PORT || 3000);
});
process.on("SIGINT", () => {
  server.close(() => {
    console.log("Exit server express");
  });
});
