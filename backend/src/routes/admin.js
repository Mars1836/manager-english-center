const express = require("express");

const asyncHandle = require("../helpers/async.handle");

const { verifyAsAdmin } = require("../middlewares/verifyToken");
const AdminCtrl = require("../controllers/admin.ctrl");
const adminRouter = express.Router();
// adminRouter.post("/search", asyncHandle(StudentCtrl.));
adminRouter.get("/", asyncHandle(AdminCtrl.getByQuery));
adminRouter.get(
  "/infor",
  asyncHandle(verifyAsAdmin),
  asyncHandle(AdminCtrl.getInfor)
);
module.exports = adminRouter;
