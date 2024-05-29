const { removeUnvalueField } = require("../utils");

const adminModel = require("../models/admin.model");
class AdminService {
  static async getAll() {
    const admins = await adminModel.find();
    return admins;
  }
  static async getById(id) {
    const admin = await adminModel.findOne({
      _id: id,
    });
    return admin;
  }
  static async create({ name, accountId }) {
    const admin = await adminModel.create({
      name,
      accountId,
    });
    return admin;
  }
  static async getInfor({ id }) {
    const admin = await adminModel.findOne({ _id: id });
    return admin;
  }
}
module.exports = AdminService;
