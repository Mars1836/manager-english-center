const express = require("express");
const studentRouter = require("./student");
const router = express.Router();
router.use("/api/v1/student", studentRouter);
// router.use("/api/v1/student1", studentRouter);
router.use((error, req, res, next) => {
  res.status(error.status || 500).send(error.message || "something wrong");
});
module.exports = router;
