const express = require("express");

const asyncHandle = require("../helpers/async.handle");
const ParentCtrl = require("../controllers/parent.ctrl");
const parentRouter = express.Router();
// parentRouter.post("/search", asyncHandle(ParentCtrl.));
parentRouter.get("/", asyncHandle(ParentCtrl.findByQuery));
parentRouter.get("/infor", asyncHandle(ParentCtrl.getInfor));
module.exports = parentRouter;
