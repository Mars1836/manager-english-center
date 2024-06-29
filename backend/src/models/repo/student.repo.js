const classModel = require("../class.model");
const lessonModel = require("../lesson.model");
const _ = require("lodash");
class StudentRepo {
  static async getSchedule({ studentId }) {
    const classes = await classModel
      .find({
        students: studentId,
      })
      .lean();
    const classMap = classes.map((i) => {
      return;
    });
    const classIds = classes.map((i) => {
      return i._id;
    });
    const lesson = await lessonModel
      .find({
        classId: {
          $in: classIds,
        },
      })
      .select("-createdAt -updatedAt -__v -attendance")
      .populate("teacherId")
      .populate("classId")
      .lean();
    const rs = lesson.map((item) => {
      item.name = item.classId.name;
      item.teacher = item.teacherId.name;
      item.classId = item.classId._id;
      return _.omit(item, ["teacherId"]);
    });
    return rs;
  }
}
module.exports = StudentRepo;
