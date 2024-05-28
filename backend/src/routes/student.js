const express = require("express");

const asyncHandle = require("../helpers/async.handle");
const StudentCtrl = require("../controllers/student.ctrl");
const studentRouter = express.Router();
// studentRouter.post("/search", asyncHandle(StudentCtrl.));
studentRouter.get("/", asyncHandle(StudentCtrl.getByQuery));
studentRouter.get("/", asyncHandle(StudentCtrl.getByQuery));
module.exports = studentRouter;
