const express = require("express");

const asyncHandle = require("../helpers/async.handle");

const ClassCtrl = require("../controllers/class.ctrl");
const {
  verifyAsStudent,
  verifyAsParentOrStudent,
  verifyAsAdmin,
  verifyAsTeacher,
} = require("../middlewares/verifyToken");
const classRouter = express.Router();
classRouter.post(
  "/student-enroll",
  asyncHandle(verifyAsStudent),
  asyncHandle(ClassCtrl.studentEnroll)
);
classRouter.post(
  "/student-cancel",
  asyncHandle(verifyAsStudent),
  asyncHandle(ClassCtrl.studentCancel)
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
classRouter.get(
  "/student",
  asyncHandle(verifyAsStudent),
  asyncHandle(ClassCtrl.findByStudent)
);
classRouter.get(
  "/teacher",
  asyncHandle(verifyAsTeacher),
  asyncHandle(ClassCtrl.findByTeacher)
);
classRouter.get("/check-conflict", asyncHandle(ClassCtrl.checkConflict));
classRouter.get(
  "/lesson/teacher",
  asyncHandle(ClassCtrl.findLessonByTeacherAndClass)
);
classRouter.patch("/attendance", asyncHandle(ClassCtrl.attendance));
classRouter.get("/attendance", asyncHandle(ClassCtrl.getAttendance));
classRouter.get("/", asyncHandle(ClassCtrl.findAll));
classRouter.get("/", asyncHandle(ClassCtrl.findAll));
classRouter.delete("/", asyncHandle(ClassCtrl.delete));

module.exports = classRouter;
