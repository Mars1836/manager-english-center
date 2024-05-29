const express = require("express");
const { SuccessRespone } = require("../core/success.reponse");
const studentModel = require("../models/student.model");
const accountModel = require("../models/account.model");
const asyncHandle = require("../helpers/async.handle");
const studentRouter = express.Router();
studentRouter.get(
  "",
  asyncHandle(async (req, res, next) => {
    const student = await studentModel.find();
    const account = await accountModel.create({
      username: "hauvu123",
      password: "123123",
      email: "hauhpll123@gmail.com",
      role: "student",
    });
    if (!account) {
      throw new Error("something wrong");
    }
    const s = await studentModel.create({
      name: "John Doe",
      classes: ["Math", "Science"],
      accountId: account._id,
      dob: new Date("2000-01-01"),
      gender: "male",
    });
    return new SuccessRespone({
      message: "Get student success",
      metadata: s,
    }).send(res);
  })
);
module.exports = studentRouter;
