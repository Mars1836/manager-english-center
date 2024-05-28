const { SuccessRespone } = require("../core/success.reponse");
const { createToken } = require("../helpers/generate.key");
const StudentService = require("../services/student.service");

class StudentCtrl {
  static async getByQuery(req, res, next) {
    const { name, _id, age } = req.query;
    const students = await StudentService.findByQuery(
      { name, _id, age },
      req.query
    );

    return new SuccessRespone({
      message: "Get students success!",
      metadata: students,
    }).send(res);
  }
}
module.exports = StudentCtrl;
