const express = require("express");

const asyncHandle = require("../helpers/async.handle");

const ClassCtrl = require("../controllers/class.ctrl");
const {
  verifyAsStudent,
  verifyAsParentOrStudent,
} = require("../middlewares/verifyToken");
const classRouter = express.Router();
classRouter.post(
  "/student-enroll",
  asyncHandle(verifyAsStudent),
  asyncHandle(ClassCtrl.studentEnroll)
);
classRouter.get(
  "/absentlesson/student",
  asyncHandle(verifyAsParentOrStudent),
  asyncHandle(ClassCtrl.getAbsentLesson)
);
classRouter.post("/", asyncHandle(ClassCtrl.create));
classRouter.post("/add-lesson", asyncHandle(ClassCtrl.addLesson));
classRouter.post("/set-status", asyncHandle(ClassCtrl.setStatus));
classRouter.get("/lesson", asyncHandle(ClassCtrl.findLessonsByClass));
classRouter.get("/student", asyncHandle(ClassCtrl.findByStudent));
classRouter.get("/parent", asyncHandle(ClassCtrl.findByParent));
classRouter.get("/teacher", asyncHandle(ClassCtrl.findByTeacher));
classRouter.get(
  "/lesson/teacher",
  asyncHandle(ClassCtrl.findLessonByTeacherAndClass)
);
classRouter.patch("/attendance", asyncHandle(ClassCtrl.attendance));
classRouter.get("/", asyncHandle(ClassCtrl.findAll));
classRouter.get("/", asyncHandle(ClassCtrl.findAll));

module.exports = classRouter;
