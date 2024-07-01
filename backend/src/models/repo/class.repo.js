const classModel = require("../class.model");
const lessonModel = require("../lesson.model");
const _ = require("lodash");

class ClassRepo {
  static async findByStudent({ studentId, map = false }) {
    let classes;
    if (map === true) {
      classes = await classModel
        .find({ students: studentId })
        .select(" -__v -createdAt -updatedAt -id")
        .populate({
          path: "lesson",
          model: lessonModel,
          select: "topic teacherId isFinished attendance",
        })
        .lean();
    } else {
      classes = await classModel
        .find({})
        .select(" -__v -createdAt -updatedAt -id")
        .populate({
          path: "lesson",
          model: lessonModel,
          select: "topic teacherId isFinished attendance",
        })
        .lean();
    }

    const rs = classes.map((item) => {
      item.totalLesson = item?.lesson.length || 0;
      item.registeredStudents = item?.students.length || 0;
      item.statusClasses = item.status;
      item.statusRegister =
        item.students.findIndex((id) => {
          return id.toString() === studentId;
        }) > -1
          ? true
          : false;
      return _.omit(item, ["lesson", "status"]);
    });
    return rs;
  }
}
module.exports = ClassRepo;
