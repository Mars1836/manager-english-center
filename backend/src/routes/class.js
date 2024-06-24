const express = require("express");

const asyncHandle = require("../helpers/async.handle");

const ClassCtrl = require("../controllers/class.ctrl");
const { verifyAsStudent } = require("../middlewares/verifyToken");
const classRouter = express.Router();
classRouter.post(
  "/student-enroll",
  // asyncHandle(verifyAsStudent),
  asyncHandle(ClassCtrl.studentEnroll)
);
classRouter.post("/", asyncHandle(ClassCtrl.create));
classRouter.post("/add-lesson", asyncHandle(ClassCtrl.addLesson));
classRouter.post("/set-status", asyncHandle(ClassCtrl.setStatus));
classRouter.get("/lesson", asyncHandle(ClassCtrl.findLessonsByClass));
classRouter.get("/student", asyncHandle(ClassCtrl.findByStudent));
classRouter.patch("/attendance", asyncHandle(ClassCtrl.attendance));
classRouter.get("/", asyncHandle(ClassCtrl.findAll));

module.exports = classRouter;
