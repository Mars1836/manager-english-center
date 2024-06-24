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
  static async setStatus(req, res, next) {
    const { status, classId } = req.body;

    const metadata = await ClassService.setStatus({ status, classId });
    return new SuccessRespone({
      message: "Set status class success",
      metadata,
    }).send(res);
  }
  static async findByStudent(req, res, next) {
    const { studentId } = req.query;

    const metadata = await ClassService.findByStudent({ studentId });
    return new SuccessRespone({
      message: "Get all class by student success",
      metadata,
    }).send(res);
  }
  static async findByQuery() {}
  static async findLessonsByClass(req, res, next) {
    const metadata = await ClassService.findLessonsByClass(req.body);
    return new SuccessRespone({
      message: "Get all lessons success",
      metadata,
    }).send(res);
  }
  static async create(req, res, next) {
    const metadata = await ClassService.create(req.body);
    return new CreateSuccess({
      message: "Create new class successful.",
      metadata,
    }).send(res);
  }
  static async addLesson(req, res, next) {
    const metadata = await ClassService.addLesson(req.body);
    return new CreateSuccess({
      message: "Add lesson successful",
      metadata,
    }).send(res);
  }
  static async studentEnroll(req, res, next) {
    const { studentId } = req.body;
    const metadata = await ClassService.studentEnroll(
      // { studentId: req.auth.student.id },
      { studentId },
      req.body
    );
    return new CreateSuccess({
      message: "Enroll class successfull.",
      metadata,
    }).send(res);
  }
  static async attendance(req, res, next) {
    const metadata = await ClassService.attendance(req.body);
    return new CreateSuccess({
      message: "Update success",
      metadata,
    }).send(res);
  }
}
module.exports = ClassCtrl;
