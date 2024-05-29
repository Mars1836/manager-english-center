const { SuccessRespone } = require("../core/success.reponse");
const AdminService = require("../services/admin.service");

class AdminCtrl {
  static async getByQuery(req, res, next) {
    const { name, _id, age } = req.query;
    const admins = await AdminService.findByQuery(
      { name, _id, age },
      req.query
    );

    return new SuccessRespone({
      message: "Get admins success!",
      metadata: admins,
    }).send(res);
  }
  static async getInfor(req, res, next) {
    if (!req?.auth?.admin) {
      return new Error("aaaaaaaaaaaaaaaaa");
    }
    const admin = await AdminService.getInfor({ id: req.auth.admin.id });
    return new SuccessRespone({
      message: "Get infor success!",
      metadata: admin,
    }).send(res);
  }
}
module.exports = AdminCtrl;
