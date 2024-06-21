const { removeUnvalueField } = require("../utils");

const teacherModel = require("../models/teacher.model");
const classModel = require("../models/class.model");
const lessonModel = require("../models/lesson.model");
const tuitionModel = require("../models/tuition.model");
const { BadRequestError } = require("../core/error.reponse");
const studentModel = require("../models/student.model");
class StudentService {
  static async findAll() {
    const students = await studentModel.find();
    return students;
  }
  static async findById(id) {
    const student = await studentModel.findOne({
      _id: id,
    });
    return student;
  }
  static async findByQuery(query, options) {
    removeUnvalueField(query);
    console.log(query);
    const students = await studentModel.find({
      ...query,
    });
    return students;
  }
  static async findByClass({ classId }, options) {
    const classStore = await classModel.findById(classId);
    if (!classStore) {
      throw new BadRequestError("Class does not exist");
    }
    const students = await studentModel.find({
      _id: {
        $in: classStore.students,
      },
    });
    return students;
  }
  static async getStatus({ studentId }) {
    // const classStore = await classModel.findById(classId);
    // if (!classStore) {
    //   throw new BadRequestError("Class does not exist");
    // }
    // if (!classStore.students.includes(studentId)) {
    //   throw new BadRequestError("This student not in this class");
    // }
    const lesson1 = await lessonModel.find({
      absent: studentId,
    });

    const lessons = await lessonModel.aggregate([
      {
        $facet: {
          absentLessons: [
            { $match: { absent: "66640e7af97700fcfddf05cd" } },
            // { $group: { _id: "$classId", count: { $sum: 1 } } },
          ],
          presentLessons: [
            { $match: { absent: { $ne: studentId } } },
            { $group: { _id: "$classId", count: { $sum: 1 } } },
          ],
        },
      },
      {
        $project: {
          _id: 0,
          absentLessons: 1,
          presentLessons: 1,
        },
      },
    ]);
    return { lessons, lesson1 };
  }
  static async create({ name, accountId, dob, gender }) {
    const student = await studentModel.create({
      name,
      accountId,
      dob,
      gender,
    });
    return student;
  }
  static async getInfor({ id }) {
    const student = await teacherModel.findOne({ _id: id });
    return student;
  }
  static async getSchedule({ studentId }) {
    const classes = await classModel
      .find({
        students: studentId,
      })
      .lean();
    const classIds = classes.map((i) => {
      return i._id;
    });
    const lesson = await lessonModel.find({
      classId: {
        $in: classIds,
      },
    });
    return lesson;
  }
  static async getTuition({ studentId }) {
    const tuition = await tuitionModel.find({
      studentId,
    });
    return tuition;
  }
}
module.exports = StudentService;
