const { removeUnvalueField, toObjectId } = require("../utils");

const adminModel = require("../models/admin.model");
const classModel = require("../models/class.model");
const lessonModel = require("../models/lesson.model");
const { BadRequestError } = require("../core/error.reponse");
const tuitionModel = require("../models/tuition.model");
const studentModel = require("../models/student.model");
const _ = require("lodash");
const {
  checkConflictStudentEnroll,
  checkConflictAddTeacherToLesson,
} = require("./lesson.service");
const ClassRepo = require("../models/repo/class.repo");
// const StudentService = require("./student.service");
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
    const rs = await lessonModel
      .find({ absent: studentId, classId })
      .populate("teacherId")
      .lean();
    const data = rs.map((item) => {
      const re = {
        ...item,
        teacher: item.teacherId.name,
      };
      return _.omit(re, ["teacherId"]);
    });
    return data;
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
  static async findByTeacher({ teacherId }) {
    const lesson = await lessonModel.find({ teacherId }).lean();
    const classIds = lesson.map((i) => {
      return i.classId.toString();
    });
    const classIdsd = classIds.filter((item, index, arr) => {
      if (
        index ===
        arr.findIndex((item2) => {
          return item2.toString() === item.toString();
        })
      ) {
        return true;
      }
      return false;
    });
    const classes = await classModel.find({ _id: classIdsd });
    return classes;
  }
  static async findByStudent({ studentId }) {
    return await ClassRepo.findByStudent({ studentId });
  }
  static async findLessonByTeacherAndClass({ classId, teacherId }) {
    const lesson = await lessonModel.find({ teacherId, classId }).lean();
    return lesson;
  }
  static async findByParent({ studentId, parentId }) {
    const tuition = await tuitionModel.find({ studentId }).lean();
    const tuitionMap = tuition.reduce((pre, acc) => {
      pre[acc.classId] = acc;
      return pre;
    }, {});
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
      // item.bill = tuitionMap[item._id];
      item.statusRegister =
        item.students.findIndex((id) => {
          return id.toString() === studentId;
        }) > -1
          ? true
          : false;
      item.tuition = tuitionMap[item._id].last_cost;
      item.paid = tuitionMap[item._id].paid;
      return _.omit(item, ["lesson", "status"]);
    });
    return rs;
  }
  static async getAttendance({ classId }) {
    // const lesson = await lessonModel.findById(lessonId);
    // if (!lesson) {
    //   throw new BadRequestError("This lesson does not exist");
    // }
    // if (!lesson.isFinished) {
    //   throw new BadRequestError(
    //     "Attendance has not been taken for this class yet."
    //   );
    // }
    const _class = await classModel
      .findById(classId)
      .populate({
        path: "lesson",
        model: lessonModel,
        select: "topic teacherId isFinished absent endTime startTime",
      })
      .populate("students")
      .lean();
    if (!_class) {
      throw new BadRequestError("This class does not exist");
    }
    const b = _class.lesson.map((ls) => {
      const sts = _class.students.map((st) => {
        let isAbsent;
        if (!ls.isFinished) {
          isAbsent = true;
        } else {
          isAbsent =
            ls.absent.findIndex((ab) => {
              return ab.toString() === st._id.toString();
            }) > -1
              ? true
              : false;
        }

        return {
          ...st,
          isAbsent,
        };
      });
      return {
        ...ls,
        students: sts,
      };
    });

    return b;
  }
  static async attendance({ lessonId, classId, studentAbsent, teacherId }) {
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
    if (udrs.studentId.toString() !== teacherId) {
      throw new BadRequestError("Teacher id is not valid!");
    }
    return udrs;
  }
  static async addLesson({ classId, topic, teacherId, startTime, endTime }) {
    const ls = { classId, topic, teacherId, startTime, endTime };
    const _class = await classModel.findById(classId);
    if (!_class) {
      throw new BadRequestError("Class provided does not exist");
    }
    if (classStore.status === "close") {
      throw new BadRequestError("Class has closed");
    }
    if (classStore.status === "end") {
      throw new BadRequestError("Class has ended");
    }
    if (checkConflictAddTeacherToLesson({ teacherId, ls })) {
      throw new BadRequestError(
        "Unable to add teacher to this lesson due to scheduling conflicts"
      );
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
  static async checkConflict({ studentId, classId }) {
    const lesson = await StudentService.getSchedule({ studentId });
    const lesson2 = await lessonModel.find({ classId });
    return { lesson, lesson2 };
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
    if (classStore.status === "close") {
      throw new BadRequestError("Class has closed");
    }
    if (classStore.status === "end") {
      throw new BadRequestError("class has ended");
    }
    let check = await checkConflictStudentEnroll({ studentId, classId });
    if (check) {
      throw new BadRequestError(
        "Unable to register for class due to scheduling conflicts."
      );
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
  static async studentCancel({ studentId }, { classId }) {
    const classStore = await classModel.findById(classId).lean();
    const studentStore = await studentModel.findById(studentId).lean();
    if (!classStore) {
      throw new BadRequestError("Class does not exist.");
    }
    if (!studentStore) {
      throw new BadRequestError("Student does not exist.");
    }
    const index = classStore.students.findIndex((item) => {
      return item.toString() === studentId;
    });
    if (index === -1) {
      throw new BadRequestError("Student is not in this class.");
    }
    const query = {
      _id: classId,
    };
    const update = {
      $pull: {
        students: studentId,
      },
    };
    const option = {
      new: true,
    };

    const nClass = await classModel.findOneAndUpdate(query, update, option);
    return nClass;
  }
}
module.exports = ClassService;
