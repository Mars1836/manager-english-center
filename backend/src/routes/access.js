const express = require("express");
const asyncHandle = require("../helpers/async.handle");
const AccessCtrl = require("../controllers/access.ctrl");
const accessRouter = express.Router();
accessRouter.post("/signup", asyncHandle(AccessCtrl.studentSignUp));
accessRouter.get("/login", asyncHandle(AccessCtrl.studentSignUp));
module.exports = accessRouter;
