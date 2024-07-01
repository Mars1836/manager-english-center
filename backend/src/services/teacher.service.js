const teacherModel = require("../models/teacher.model");
const lessonModel = require("../models/lesson.model");
const { removeUnvalueField } = require("../utils");
const _ = require("lodash");
class TeacherService {
  static async findAll() {
    const teachers = await teacherModel.find().populate("accountId").lean();
    const t = teachers.map((tc) => {
      if (!tc.dateOflastPaid) {
        tc.isPaid = false;
      } else {
        tc.isPaid = tc.dateOflastPaid.getMonth() === new Date().getMonth();
      }
      tc.email = tc.accountId.email;
      const rs = tc;
      return _.omit(rs, ["accountId"]);
    });
    return t;
  }
  static async findById(id) {
    const student = await teacherModel.findOne({
      _id: id,
    });
    return student;
  }
  static async findByQuery(query = {}, options) {
    removeUnvalueField(query);
    console.log(query);
    const teachers = await teacherModel.find({
      ...query,
    });
    return teachers;
  }
  static async getSchedule({ teacherId }) {
    const lessons = await lessonModel.find({ teacherId });
    return lessons;
  }
  static async create({ name, accountId, dob, gender }) {
    const teacher = await teacherModel.create({
      name,
      accountId,
      dob,
      gender,
    });
    return teacher;
  }
  static async getInfor({ id }) {
    const teacher = await teacherModel
      .findOne({ _id: id })
      .populate("accountId")
      .lean();
    teacher.email = teacher.accountId.email;
    if (!teacher.address === null || teacher.address === undefined) {
      teacher.address = "";
    }
    return _.omit(teacher, ["accountId"]);
  }
}
module.exports = TeacherService;
