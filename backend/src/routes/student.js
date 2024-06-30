const express = require("express");

const asyncHandle = require("../helpers/async.handle");
const StudentCtrl = require("../controllers/student.ctrl");
const {
  verifyAsStudent,
  verifyAsParentOrStudent,
} = require("../middlewares/verifyToken");
const studentRouter = express.Router();
// studentRouter.post("/search", asyncHandle(StudentCtrl.));
studentRouter.get("/class", asyncHandle(StudentCtrl.findByClass));
studentRouter.get(
  "/schedule",
  asyncHandle(verifyAsParentOrStudent),
  asyncHandle(StudentCtrl.getSchedule)
);
studentRouter.get(
  "/status",
  asyncHandle(verifyAsParentOrStudent),
  asyncHandle(StudentCtrl.getStatus)
);
studentRouter.get(
  "/statusv2",
  asyncHandle(verifyAsParentOrStudent),
  asyncHandle(StudentCtrl.getStatusV2)
);
studentRouter.get("/statusv3", asyncHandle(StudentCtrl.getStatusV3));
studentRouter.get(
  "/tuition",
  asyncHandle(verifyAsParentOrStudent),
  asyncHandle(StudentCtrl.getTuition)
);

studentRouter.get(
  "/infor",
  asyncHandle(verifyAsStudent),
  asyncHandle(StudentCtrl.getInfor)
);
studentRouter.post("/set-discount", asyncHandle(StudentCtrl.setDiscount));
studentRouter.get("/", asyncHandle(StudentCtrl.findByQuery));

module.exports = studentRouter;
