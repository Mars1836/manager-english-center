const tuitionModel = require("../models/tuition.model");

class StaticService {
  static async studentEnrollFollowMonth({ year }) {
    year = parseInt(year);
    const data = await tuitionModel.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $year: "$createdAt" }, year],
          },
        },
      },
      {
        $group: {
          _id: { month: { $month: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.month": 1 },
      },
    ]);
    const allMonths = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      count: 0,
    }));

    // Ánh xạ các kết quả từ MongoDB vào danh sách tất cả các tháng
    data.forEach((record) => {
      const monthIndex = record._id.month - 1; // Chỉ số tháng (0-11)
      allMonths[monthIndex].count = record.count;
    });

    return allMonths.map((i) => {
      return i.count;
    });
  }
}
module.exports = StaticService;
