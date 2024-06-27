const express = require("express");

const asyncHandle = require("../helpers/async.handle");
const PaymentCtl = require("../controllers/payment.ctrl");
const { verifyAsParent } = require("../middlewares/verifyToken");
const paymentRouter = express.Router();
// paymentRouter.post("/search", asyncHandle(ParentCtrl.));
paymentRouter.post(
  "/pay-tuition",
  asyncHandle(verifyAsParent),
  asyncHandle(PaymentCtl.cardPayment)
);
paymentRouter.post("/pay-salary", asyncHandle(PaymentCtl.paySalary));
module.exports = paymentRouter;
