const adminModel = require("../models/admin.model");
const lessonModel = require("../models/lesson.model");
const StudentRepo = require("../models/repo/student.repo");
const TeacherService = require("./teacher.service");

class LessonService {
  static async checkConflict({ studentId, classId }) {
    const a = await StudentRepo.getSchedule({ studentId });
    const b = await lessonModel.find({ classId }).lean();
    return check(a, b);
  }
  static async checkConflictStudentEnroll({ studentId, classId }) {
    const a = await StudentRepo.getSchedule({ studentId });
    const b = await lessonModel.find({ classId }).lean();
    return check(a, b);
  }
  static async checkConflictAddTeacherToLesson({ teacherId, lesson }) {
    const a = await TeacherService.getSchedule({ teacherId });
    console.log("asd", check(a, [lesson]));
    return check(a, [lesson]);
  }
}
function check(a1, a2) {
  const a = a2.filter((item) => {
    for (let i in a1) {
      if (
        isTimeOverlap(
          item.startTime,
          item.endTime,
          a1[i].startTime,
          a1[i].endTime
        )
      ) {
        return true;
      }
    }
  });
  return a.length > 0;
}
function isTimeOverlap(start1, end1, start2, end2) {
  const a =
    new Date(start1) < new Date(end2) && new Date(start2) < new Date(end1);
  return a;
}
module.exports = LessonService;
