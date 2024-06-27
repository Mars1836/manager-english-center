const { SuccessRespone } = require("../core/success.reponse");
const PaymentService = require("../services/payment.service");

class PaymentCtl {
  static async cardPayment(req, res, next) {
    const { cardNumber, ccv, money, classId } = req.body;
    console.log(req.auth);
    const p = await PaymentService.cardPayment({
      cardNumber,
      ccv,
      money,
      studentId: req.auth.student.id,
      classId,
    });
    // res.json(parents);
    return new SuccessRespone({
      message: "Payment successful!",
      metadata: p,
    }).send(res);
  }
}
module.exports = PaymentCtl;
