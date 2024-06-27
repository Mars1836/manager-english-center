const { BadRequestError } = require("../core/error.reponse");
const teacherModel = require("../models/teacher.model");
const tuitionModel = require("../models/tuition.model");

class PaymentService {
  static async paySalary({ teacherId, money }) {
    const teacher = await teacherModel.findById(teacherId);
    if (!teacher) {
      throw new BadRequestError("This teacher does not exist!");
    }
    const moneyPaid = money ?? teacher.salary;
    teacher.dateOflastPaid = Date.now();
    teacher.prePaid = moneyPaid;
    teacher.totalPaid += moneyPaid;
    return await teacher.save();
  }
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
