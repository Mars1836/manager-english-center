const express = require("express");

const asyncHandle = require("../helpers/async.handle");
const { verifyAsTeacher } = require("../middlewares/verifyToken");
const TeacherCtrl = require("../controllers/teacher.ctrl");
const teacherRouter = express.Router();
// teacherRouter.post("/search", asyncHandle(Teache.));
teacherRouter.get("/", asyncHandle(TeacherCtrl.findAll));
teacherRouter.get(
  "/schedule",
  asyncHandle(verifyAsTeacher),
  asyncHandle(TeacherCtrl.getSchedule)
);
teacherRouter.get(
  "/infor",
  asyncHandle(verifyAsTeacher),
  asyncHandle(TeacherCtrl.getInfor)
);
module.exports = teacherRouter;
