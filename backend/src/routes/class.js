const express = require("express");

const asyncHandle = require("../helpers/async.handle");

const ClassCtrl = require("../controllers/class.ctrl");
const classRouter = express.Router();
classRouter.post("/", asyncHandle(ClassCtrl.create));
classRouter.get("/", asyncHandle(ClassCtrl.findAll));

module.exports = classRouter;
