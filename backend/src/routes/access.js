const express = require("express");
const asyncHandle = require("../helpers/async.handle");
const AccessCtrl = require("../controllers/access.ctrl");
const {
  verifyAsStudent,
  verifyAsAdmin,
} = require("../middlewares/verifyToken");
const accessRouter = express.Router();
accessRouter.get(
  "/verifytoken/student",
  asyncHandle(verifyAsStudent),
  asyncHandle(AccessCtrl.verified)
);
accessRouter.get(
  "/verifytoken/admin",
  asyncHandle(verifyAsAdmin),
  asyncHandle(AccessCtrl.verified)
);
accessRouter.post("/signup/student", asyncHandle(AccessCtrl.studentSignUp));
accessRouter.post("/signup/admin", asyncHandle(AccessCtrl.admintSignUp));
accessRouter.post("/signup/teacher", asyncHandle(AccessCtrl.teacherSignUp));
accessRouter.post("/signup/parent", asyncHandle(AccessCtrl.parentSignUp));
accessRouter.post("/login/student", asyncHandle(AccessCtrl.studentLogin));
accessRouter.post("/login/admin", asyncHandle(AccessCtrl.adminLogin));
accessRouter.post("/login/teacher", asyncHandle(AccessCtrl.teacherLogin));
accessRouter.post("/login/parent", asyncHandle(AccessCtrl.parentLogin));

module.exports = accessRouter;
