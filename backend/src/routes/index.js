const express = require("express");
const studentRouter = require("./student");
const router = express.Router();
const accessRouter = require("./access");
router.use("/api/v1/student", studentRouter);
router.use("/api/v1/auth", accessRouter);
router.use((error, req, res, next) => {
  res.status(error.status || 500).send(error.message || "something wrong");
});
module.exports = router;
