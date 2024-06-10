const { CreateSuccess, SuccessRespone } = require("../core/success.reponse");
const ClassService = require("../services/class.service");

class ClassCtrl {
  static async findAll(req, res, next) {
    const metadata = await ClassService.findAll();
    return new SuccessRespone({
      message: "Get all class success",
      metadata,
    }).send(res);
  }
  static async findByQuery() {}
  static async create(req, res, next) {
    const metadata = await ClassService.create(req.body);
    return new CreateSuccess({
      message: "Create new class successful.",
      metadata,
    }).send(res);
  }
  static async studentEnroll(req, res, next) {
    const metadata = await ClassService.studentEnroll(
      { studentId: req.auth.student.id },
      req.body
    );
    return new CreateSuccess({
      message: "Enroll class successfull.",
      metadata,
    }).send(res);
  }
}
module.exports = ClassCtrl;