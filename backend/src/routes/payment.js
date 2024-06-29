const express = require("express");

const asyncHandle = require("../helpers/async.handle");
const PaymentCtl = require("../controllers/payment.ctrl");
const { verifyAsParent, verifyAsAdmin } = require("../middlewares/verifyToken");
const paymentRouter = express.Router();
paymentRouter.post(
  "/pay-tuition",
  asyncHandle(verifyAsParent),
  asyncHandle(PaymentCtl.cardPayment)
);
paymentRouter.post(
  "/pay-salary",
  asyncHandle(verifyAsAdmin),
  asyncHandle(PaymentCtl.paySalary)
);
module.exports = paymentRouter;
