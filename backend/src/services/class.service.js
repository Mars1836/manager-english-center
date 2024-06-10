const { removeUnvalueField } = require("../utils");

const adminModel = require("../models/admin.model");
const classModel = require("../models/class.model");
const lessonModel = require("../models/lesson.model");
const { BadRequestError } = require("../core/error.reponse");
class ClassService {
  static async create({ name, year, grade, lessons = [] }) {
    const _class = await classModel.create({ name, year, grade });
    const lessonData = lessons.map((i) => {
      const { date, topic, teacherId } = i;
      return {
        date,
        topic,
        teacherId,
        classId: _class._id,
      };
    });
    const lessonRs = await lessonModel.insertMany(lessonData);
    if (!lessonRs) {
      throw new BadRequestError("Lesson is invalid");
    }

    return { ..._class._doc, lessons: lessonRs };
  }
  static async addLesson({ classId, topic, date, teacherId }) {
    const _class = await classModel.findById(classId);
    if (!_class) {
      throw new BadRequestError("Class provided does not exist");
    }
    const lesson = await lessonModel.create({
      classId,
      topic,
      date,
      teacherId,
    });
    return lesson;
  }
  static async findLessonsByClass({ classId }) {
    const lessons = await lessonModel.find({
      classId,
    });
    return lessons;
  }
  static async findAll() {
    const classes = await classModel
      .find()
      .populate({
        path: "lesson",
        model: lessonModel,
        select: "topic teacherId isFinished attendance",
      })
      .select("name year grade _id")
      .lean();
    return classes;
  }
  static async studentEnroll({ studentId }, { classId }) {
    const query = {
      _id: classId,
    };
    const update = {
      $addToSet: {
        students: studentId,
      },
    };
    const option = {
      new: true,
    };
    const nClass = await classModel.findOneAndUpdate(query, update, option);
    if (!nClass) {
      throw new BadRequestError("Enroll class failed!");
    }
    return nClass;
  }
}
module.exports = ClassService;
