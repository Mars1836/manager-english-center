const express = require("express");

const asyncHandle = require("../helpers/async.handle");
const StudentCtrl = require("../controllers/student.ctrl");
const { verifyAsStudent } = require("../middlewares/verifyToken");
const studentRouter = express.Router();
// studentRouter.post("/search", asyncHandle(StudentCtrl.));
studentRouter.get("/", asyncHandle(StudentCtrl.getByQuery));
studentRouter.get("/", asyncHandle(StudentCtrl.getByQuery));
studentRouter.get(
  "/infor",
  asyncHandle(verifyAsStudent),
  asyncHandle(StudentCtrl.getInfor)
);
module.exports = studentRouter;
