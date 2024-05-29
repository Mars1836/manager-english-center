const { removeUnvalueField } = require("../utils");

const adminModel = require("../models/admin.model");
const classModel = require("../models/class.model");
class ClassService {
  static async create({}) {
    const _class = classModel.create({});
    return _class;
  }

  static async getAll() {}
  static async getByStudent() {}
  static async getByTeacher() {}
}
module.exports = ClassService;
