const express = require("express");

const asyncHandle = require("../helpers/async.handle");
const StatisticCtl = require("../controllers/statistic.ctrl");
const { verifyAsParent, verifyAsAdmin } = require("../middlewares/verifyToken");
const statisticRouter = express.Router();
statisticRouter.get(
  "/student-fl-month",
  //   asyncHandle(verifyAsAdmin),
  asyncHandle(StatisticCtl.studentEnrollFollowMonth)
);
module.exports = statisticRouter;
