const { SuccessRespone, CreateSuccess } = require("../core/success.reponse");
const AccessService = require("../services/access.service");
const StudentService = require("../services/student.service");

class AccessCtrl {
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
}
module.exports = AccessCtrl;
