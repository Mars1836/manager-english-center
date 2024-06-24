const express = require("express");

const asyncHandle = require("../helpers/async.handle");
const ParentCtrl = require("../controllers/parent.ctrl");
const parentRouter = express.Router();
module.exports = parentRouter;
