const { SuccessRespone } = require("../core/success.reponse");
const { createToken } = require("../helpers/generate.key");
const TeacherService = require("../services/student.service");

class TeacherCtrl {
  static async findByQuery(req, res, next) {
    const { name, _id, age } = req.query;
    const students = await TeacherService.findByQuery(
      { name, _id, age },
      req.query
    );
    // res.json(students);
    return new SuccessRespone({
      message: "Get teacher",
      metadata: students,
    }).send(res);
  }
  static async getInfor(req, res, next) {
    if (!req?.auth?.teacher) {
      return new Error("This requess requires authentication");
    }
    const student = await TeacherService.getInfor({ id: req.auth.student.id });
    return new SuccessRespone({
      message: "Get infor success!",
      metadata: student,
    }).send(res);
  }
}
module.exports = TeacherCtrl;
