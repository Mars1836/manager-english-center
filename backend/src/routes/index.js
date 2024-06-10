const express = require("express");
const studentRouter = require("./student");
const router = express.Router();
const accessRouter = require("./access");
const adminRouter = require("./admin");
const classRouter = require("./class");
const teacherRouter = require("./teacher");
const parentRouter = require("./parent");
router.use("/api/v1/student", studentRouter);
router.use("/api/v1/teacher", teacherRouter);
router.use("/api/v1/parent", parentRouter);
router.use("/api/v1/admin", adminRouter);
router.use("/api/v1/auth", accessRouter);
router.use("/api/v1/class", classRouter);
router.use((error, req, res, next) => {
  res.status(error.status || 500).send(error.message || "something wrong");
});
module.exports = router;
