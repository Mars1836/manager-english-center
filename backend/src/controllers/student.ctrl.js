const { SuccessRespone } = require("../core/success.reponse");
const { createToken } = require("../helpers/generate.key");
const StudentService = require("../services/student.service");

class StudentCtrl {
  static async findByQuery(req, res, next) {
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
  static async findByClass(req, res, next) {
    const { classId } = req.query;
    const students = await StudentService.findByClass({ classId }, req.query);
    return new SuccessRespone({
      message: "Get student",
      metadata: students,
    }).send(res);
  }
  static async getStatus(req, res, next) {
    const { studentId } = req.query;
    const rs = await StudentService.getStatus({ studentId });
    return new SuccessRespone({
      message: "Get status success",
      metadata: rs,
    }).send(res);
  }
  static async getStatusV2(req, res, next) {
    const { studentId } = req.query;
    console.log(studentId);
    const rs = await StudentService.getStatusV2({ studentId });
    return new SuccessRespone({
      message: "Get status success",
      metadata: rs,
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
  static async getSchedule(req, res, next) {
    const { studentId } = req.query;
    const rs = await StudentService.getSchedule({ studentId });
    return new SuccessRespone({
      message: "Get shedule success!",
      metadata: rs,
    }).send(res);
  }
  static async getTuition(req, res, next) {
    const { studentId } = req.query;
    const rs = await StudentService.getTuition({ studentId });
    return new SuccessRespone({
      message: "Get shedule success!",
      metadata: rs,
    }).send(res);
  }
}
module.exports = StudentCtrl;
