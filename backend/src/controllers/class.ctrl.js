const { CreateSuccess, SuccessRespone } = require("../core/success.reponse");
const ClassService = require("../services/class.service");
const LessonService = require("../services/lesson.service");

class ClassCtrl {
  static async checkConflict(req, res, next) {
    console.log(req.query);
    const { classId, studentId } = req.query;
    const metadata = await LessonService.checkConflict({ classId, studentId });
    return new SuccessRespone({
      message: "Check conflict",
      metadata,
    }).send(res);
  }
  static async getAbsentLesson(req, res, next) {
    const { classId } = req.query;
    const metadata = await ClassService.getAbsentLesson({
      studentId: req.auth.student.id,
      classId,
    });
    return new SuccessRespone({
      message: "Get absent lessson of student success",
      metadata,
    }).send(res);
  }
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
    const studentId = req.auth.student.id;

    const metadata = await ClassService.findByStudent({ studentId });
    return new SuccessRespone({
      message: "Get all class by student success",
      metadata,
    }).send(res);
  }
  static async findByParent(req, res, next) {
    const { studentId, parentId } = req.query;

    const metadata = await ClassService.findByParent({ studentId, parentId });
    return new SuccessRespone({
      message: "Get all class by parent success",
      metadata,
    }).send(res);
  }
  static async findByTeacher(req, res, next) {
    const { teacherId } = req.query;
    const metadata = await ClassService.findByTeacher({ teacherId });
    return new SuccessRespone({
      message: "Get all class by parent success",
      metadata,
    }).send(res);
  }
  static async findByQuery() {}
  static async findLessonsByClass(req, res, next) {
    const metadata = await ClassService.findLessonsByClass(req.query);
    return new SuccessRespone({
      message: "Get all lessons success",
      metadata,
    }).send(res);
  }
  static async findLessonByTeacherAndClass(req, res, next) {
    const { classId, teacherId } = req.query;
    const metadata = await ClassService.findLessonByTeacherAndClass({
      classId,
      teacherId,
    });
    return new SuccessRespone({
      message: "Get all lessons by teacher and class success",
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
    const studentId = req.auth.student.id;
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
    const teacherId = req.auth.teacher.id;
    const metadata = await ClassService.attendance({
      ...req.body,
      teacherId,
    });
    return new CreateSuccess({
      message: "Update success",
      metadata,
    }).send(res);
  }
  static async getAttendance(req, res, next) {
    const { classId } = req.query;
    const metadata = await ClassService.getAttendance({
      classId,
    });
    return new CreateSuccess({
      message: "Update success",
      metadata,
    }).send(res);
  }
}
module.exports = ClassCtrl;
