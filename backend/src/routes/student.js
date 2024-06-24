const express = require("express");

const asyncHandle = require("../helpers/async.handle");
const StudentCtrl = require("../controllers/student.ctrl");
const { verifyAsStudent } = require("../middlewares/verifyToken");
const studentRouter = express.Router();
// studentRouter.post("/search", asyncHandle(StudentCtrl.));
studentRouter.get("/class", asyncHandle(StudentCtrl.findByClass));
studentRouter.get("/schedule/:studentId", asyncHandle(StudentCtrl.getSchedule));
studentRouter.get("/status/:studentId", asyncHandle(StudentCtrl.getStatus));
studentRouter.get("/statusv2/:studentId", asyncHandle(StudentCtrl.getStatusV2));
studentRouter.get("/tuition/:studentId", asyncHandle(StudentCtrl.getTuition));
studentRouter.get(
  "/infor",
  asyncHandle(verifyAsStudent),
  asyncHandle(StudentCtrl.getInfor)
);
studentRouter.get("/", asyncHandle(StudentCtrl.findByQuery));

module.exports = studentRouter;
