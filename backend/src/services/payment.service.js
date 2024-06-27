const { BadRequestError } = require("../core/error.reponse");
const tuitionModel = require("../models/tuition.model");

class PaymentService {
  static async cardPayment({
    cardNumber,
    ccv,
    nameOfCard,
    money,
    studentId,
    classId,
  }) {
    const tuition = await tuitionModel.findOne({ studentId, classId });
    if (tuition.isFinish) {
      throw new BadRequestError(
        `You have already completed payment for this class!`
      );
    }
    if (tuition.paid + parseInt(money) <= tuition.last_cost) {
      tuition.paid += money;
      if (tuition.paid === tuition.last_cost) {
        tuition.isFinish = true;
      }
    } else {
      throw new BadRequestError(
        `You just need to pay the remaining ${
          tuition.last_cost - tuition.paid
        }đ for this class `
      );
    }
    return await tuition.save();
  }
}
module.exports = PaymentService;
