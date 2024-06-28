const { SuccessRespone } = require("../core/success.reponse");
const { createToken } = require("../helpers/generate.key");
const TeacherService = require("../services/teacher.service");

class TeacherCtrl {
  static async findByQuery(req, res, next) {
    const { name, _id, age } = req.query;
    const teachers = await TeacherService.findByQuery(
      { name, _id, age },
      req.query
    );
    // res.json(teachers);
    return new SuccessRespone({
      message: "Get teacher",
      metadata: teachers,
    }).send(res);
  }
  static async getSchedule(req, res, next) {
    const teachers = await TeacherService.getSchedule({
      teacherId: req.auth.teacher.id,
    });
    // res.json(teachers);
    return new SuccessRespone({
      message: "Get teacher's schedule successful",
      metadata: teachers,
    }).send(res);
  }
  static async findAll(req, res, next) {
    const teachers = await TeacherService.findAll();
    // res.json(teachers);
    return new SuccessRespone({
      message: "Get teachers successful",
      metadata: teachers,
    }).send(res);
  }
  static async getInfor(req, res, next) {
    if (!req?.auth?.teacher) {
      return new Error("This requess requires authentication");
    }
    const student = await TeacherService.getInfor({ id: req.auth.teacher.id });
    return new SuccessRespone({
      message: "Get infor success!",
      metadata: student,
    }).send(res);
  }
}
module.exports = TeacherCtrl;
