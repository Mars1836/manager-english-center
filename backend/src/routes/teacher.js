const express = require("express");

const asyncHandle = require("../helpers/async.handle");
const { verifyAsStudent } = require("../middlewares/verifyToken");
const TeacherCtrl = require("../controllers/teacher.ctrl");
const teacherRouter = express.Router();
// teacherRouter.post("/search", asyncHandle(Teache.));
teacherRouter.get("/", asyncHandle(TeacherCtrl.findByQuery));
teacherRouter.get(
  "/infor",
  asyncHandle(verifyAsStudent),
  asyncHandle(TeacherCtrl.getInfor)
);
module.exports = teacherRouter;