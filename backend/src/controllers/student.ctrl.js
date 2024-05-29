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
    // res.json(students);
    return new SuccessRespone({
      message: "Get student",
      metadata: students,
    }).send(res);
  }
  static async getInfor(req, res, next) {
    if (!req?.auth?.student) {
      return new Error("aaaaaaaaaaaaaaaaa");
    }
    const student = await StudentService.getInfor({ id: req.auth.student.id });
    return new SuccessRespone({
      message: "Get infor success!",
      metadata: student,
    }).send(res);
  }
}
module.exports = StudentCtrl;
