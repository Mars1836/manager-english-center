const { SuccessRespone, CreateSuccess } = require("../core/success.reponse");
const AccessService = require("../services/access.service");
const StudentService = require("../services/student.service");

class AccessCtrl {
  static async verified(req, res, next) {
    return new SuccessRespone({
      message: "Verified",
    }).send(res);
  }
  static async studentSignUp(req, res, next) {
    const metadata = await AccessService.studentSignUp(req.body);

    return new CreateSuccess({
      message: "Sign up student success",
      metadata,
    }).send(res);
  }
  static async admintSignUp(req, res, next) {
    const metadata = await AccessService.adminSignUp(req.body);
    return new CreateSuccess({
      message: "Sign up admin success",
      metadata,
    }).send(res);
  }
  static async teacherSignUp(req, res, next) {
    const metadata = await AccessService.teacherSignUp(req.body);
    return new CreateSuccess({
      message: "Sign up teacher success",
      metadata,
    }).send(res);
  }

  static async parentSignUp(req, res, next) {
    const metadata = await AccessService.parentSignUp(req.body);
    return new CreateSuccess({
      message: "Sign up parent success",
      metadata,
    }).send(res);
  }
  static async studentLogin(req, res, next) {
    const metadata = await AccessService.studentLogin(req.body);
    return new CreateSuccess({
      message: "Student login success",
      metadata,
    }).send(res);
  }
  static async adminLogin(req, res, next) {
    const metadata = await AccessService.adminLogin(req.body);
    return new CreateSuccess({
      message: "Admin login success",
      metadata,
    }).send(res);
  }
  static async teacherLogin(req, res, next) {
    const metadata = await AccessService.teacherLogin(req.body);
    return new CreateSuccess({
      message: "Teacher login success",
      metadata,
    }).send(res);
  }
  static async parentLogin(req, res, next) {
    const metadata = await AccessService.parentLogin(req.body);
    return new CreateSuccess({
      message: "Parent login success",
      metadata,
    }).send(res);
  }
}
module.exports = AccessCtrl;
