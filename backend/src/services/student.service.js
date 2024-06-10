const { removeUnvalueField } = require("../utils");

const teacherModel = require("../models/teacher.model");

class StudentService {
  static async findAll() {
    const students = await teacherModel.find();
    return students;
  }
  static async findById(id) {
    const student = await teacherModel.findOne({
      _id: id,
    });
    return student;
  }
  static async findByQuery(query, options) {
    removeUnvalueField(query);
    console.log(query);
    const students = await teacherModel.find({
      ...query,
    });
    return students;
  }
  static async create({ name, accountId, dob, gender }) {
    const student = await teacherModel.create({
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
}
module.exports = StudentService;
