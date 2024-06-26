const { removeUnvalueField, toObjectId } = require("../utils");

const adminModel = require("../models/admin.model");
const classModel = require("../models/class.model");
const lessonModel = require("../models/lesson.model");
const { BadRequestError } = require("../core/error.reponse");
const tuitionModel = require("../models/tuition.model");
const studentModel = require("../models/student.model");
const _ = require("lodash");
class ClassService {
  static async create({
    name,
    year,
    grade,
    lessons = [],
    tuition,
    maxStudents,
  }) {
    const _class = await classModel.create({
      name,
      year,
      grade,
      tuition,
      maxStudents,
    });
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
  static async getAbsentLesson({ studentId, classId }) {
    const rs = await lessonModel.find({ absent: studentId, classId });
    return rs;
  }
  static async setStatus({ status, classId }) {
    const rs = await classModel.findOneAndUpdate(
      { _id: classId },
      { status },
      { new: true, runValidators: true }
    );
    if (!rs) {
      throw new BadRequestError("Set class status failded!");
    }
    return rs;
  }
  static async findByStudent({ studentId }) {
    const classes = await classModel
      .find({ students: studentId })
      .select(" -__v -createdAt -updatedAt -id")
      .populate({
        path: "lesson",
        model: lessonModel,
        select: "topic teacherId isFinished attendance",
      })
      .lean();
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
  static async attendance({ lessonId, classId, studentAbsent }) {
    const _class = await classModel.findById(classId);
    if (!_class) {
      throw new BadRequestError("This class does not exist");
    }

    studentAbsent.forEach((st) => {
      if (!_class.students.includes(st)) {
        throw new BadRequestError("This student is not in class");
      }
    });
    const query = {
      _id: lessonId,
      classId,
    };
    const update = {
      $set: { absent: studentAbsent, isFinished: true },
    };
    const options = {
      new: true,
    };
    const udrs = await lessonModel.findOneAndUpdate(query, update, options);
    if (!udrs) {
      throw new BadRequestError("Attendance failed!");
    }
    return udrs;
  }
  static async addLesson({ classId, topic, teacherId, startTime, endTime }) {
    const _class = await classModel.findById(classId);
    if (!_class) {
      throw new BadRequestError("Class provided does not exist");
    }
    const lesson = await lessonModel.create({
      classId,
      topic,
      teacherId,
      startTime,
      endTime,
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
      .select("-__v -createdAt -updatedAt")
      .lean();
    return classes;
  }
  static async studentEnroll({ studentId }, { classId }) {
    const classStore = await classModel.findById(classId);
    const studentStore = await studentModel.findById(studentId);
    if (!classStore) {
      throw new BadRequestError("Class does not exist.");
    }
    if (!studentStore) {
      throw new BadRequestError("Student does not exist.");
    }
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
    if (nClass.students.length === classStore.students.length) {
      throw new BadRequestError("This student is alrealy in this class!");
    } else {
      const discount = studentStore.discount ?? 0;
      const newTuition = await tuitionModel.create({
        classId,
        studentId,
        original_cost: classStore.tuition,
        discount: studentStore.discount,
      });
      return nClass;
    }
  }
}
module.exports = ClassService;
