const teacherModel = require("../models/teacher.model");
const { removeUnvalueField } = require("../utils");

class TeacherService {
  static async findAll() {
    const teachers = await teacherModel.find();
    return teachers;
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
    const teacher = await teacherModel.findOne({ _id: id });
    return teacher;
  }
}
module.exports = TeacherService;
