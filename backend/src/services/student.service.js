const { removeUnvalueField, toObjectId } = require("../utils");
const _ = require("lodash");
const teacherModel = require("../models/teacher.model");
const classModel = require("../models/class.model");
const lessonModel = require("../models/lesson.model");
const tuitionModel = require("../models/tuition.model");
const { BadRequestError } = require("../core/error.reponse");
const studentModel = require("../models/student.model");
const ClassRepo = require("../models/repo/class.repo");
const StudentRepo = require("../models/repo/student.repo");
class StudentService {
  static async setDiscount({ studentId, discount }) {
    const tuition = await tuitionModel.updateMany(
      { studentId, isFinish: false, paid: 0 },
      [
        {
          $set: {
            last_cost: {
              $subtract: [
                "$original_cost",
                { $multiply: ["$original_cost", { $divide: [discount, 100] }] },
              ],
            },
            discount: discount,
          },
        },
      ]
    );
    const newTuition = await tuitionModel.find({ studentId });
    const student = await studentModel.findOneAndUpdate(
      { _id: studentId },
      { discount: discount },
      {
        new: true,
      }
    );

    tuitionModel.fin;
    return { tuition: newTuition, student };
  }
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
    const students = await studentModel
      .find({
        ...query,
      })
      .populate("accountId")
      .lean();
    const studentMap = students.map((item) => {
      const re = {
        email: item.accountId.email,
        ...item,
      };
      return _.omit(re, ["accountId"]);
    });
    return studentMap;
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
  static async getStatusV3({ studentId }) {
    const classes = await ClassRepo.findByStudent({ studentId });
    const classIds = classes.map((item) => toObjectId(item._id));
    const tuition = await tuitionModel.find({ studentId });
    const tuitionOb = tuition.reduce((acc, cur) => {
      acc[cur.classId.toString()] = cur;
      return acc;
    }, {});

    const classesOb = classes.reduce((acc, cur) => {
      acc[cur._id.toString()] = cur;
      return acc;
    }, {});

    const rs = await lessonModel.aggregate([
      {
        $match: { classId: { $in: classIds }, isFinished: true },
      },
      {
        $group: {
          _id: "$classId",
          skipClass: {
            $sum: {
              $cond: {
                if: { $in: [toObjectId(studentId), "$absent"] },
                then: 1,
                else: 0,
              },
            },
          },
          learned: {
            $sum: {
              $cond: {
                if: { $in: [toObjectId(studentId), "$absent"] },
                then: 0,
                else: 1,
              },
            },
          },
        },
      },
    ]);
    const a = rs.map((item) => {
      let ob = {
        ...item,
        ...classesOb[item._id],
        totalLesson: classesOb[item._id]?.totalLesson || 0,
        tuition: tuitionOb[item._id.toString()]?.last_cost,
        paid: tuitionOb[item._id.toString()]?.paid,
      };
      return _.omit(ob, ["lesson"]);
    });
    return a;
  }
  static async getStatusV2({ studentId }) {
    const classes = await ClassRepo.findByStudent({ studentId, map: true });

    const classIds = classes.map((item) => toObjectId(item._id));
    const classesOb = classes.reduce((acc, cur) => {
      acc[cur._id.toString()] = cur;
      return acc;
    }, {});
    console.log(classIds);
    const tuitions = await tuitionModel.find({ studentId });
    const tuitionRe = tuitions.reduce((acc, cur) => {
      acc[cur.classId.toString()] = cur;
      return acc;
    }, {});
    console.log(tuitionRe);
    const rs = await lessonModel.aggregate([
      {
        $match: { classId: { $in: classIds }, isFinished: true },
      },
      {
        $group: {
          _id: "$classId",
          skipClass: {
            $sum: {
              $cond: {
                if: { $in: [toObjectId(studentId), "$absent"] },
                then: 1,
                else: 0,
              },
            },
          },
          learned: {
            $sum: {
              $cond: {
                if: { $in: [toObjectId(studentId), "$absent"] },
                then: 0,
                else: 1,
              },
            },
          },
        },
      },
    ]);
    const a = rs.map((item) => {
      let ob = {
        ...item,
        tuition: tuitionRe[item._id.toString()]?.last_cost,
        paid: tuitionRe[item._id.toString()]?.paid,
        originalTuition: tuitionRe[item._id.toString()]?.original_cost,
      };
      return _.omit(ob, ["lesson"]);
    });
    const aRe = a.reduce((pre, cur) => {
      pre[cur._id.toString()] = cur;
      return pre;
    }, {});
    const classHandle = classes.map((item) => {
      const status = aRe[item._id] || {
        skipClass: 0,
        learned: 0,
      };
      const map = {
        tuition: tuitionRe[item._id.toString()]?.last_cost,
        originalTuition: tuitionRe[item._id.toString()]?.original_cost,
        paid: tuitionRe[item._id.toString()]?.paid,
      };
      const i1 = {
        ...item,
        ...map,
        ...status,
      };
      return i1;
    });
    return classHandle;
  }
  static async getStatus({ studentId }) {
    // lấy danh sách nghỉ học của từng lớp học và danh sách có mặt của từng lớp học
    const lessonResults = await lessonModel.aggregate([
      { $match: { isFinished: true } },
      {
        $facet: {
          absentLessons: [
            { $match: { absent: toObjectId(studentId) } },
            { $group: { _id: "$classId", count: { $sum: 1 } } },
            { $project: { classId: "$_id", count: 1, _id: 0 } },
          ],
          presentLessons: [
            { $match: { absent: { $ne: toObjectId(studentId) } } },
            { $group: { _id: "$classId", count: { $sum: 1 } } },
            { $project: { classId: "$_id", count: 1, _id: 0 } },
          ],
        },
      },
    ]);
    const absentLessons = lessonResults[0].absentLessons;
    const presentLessons = lessonResults[0].presentLessons;

    // Extract unique classIds from both absentLessons and presentLessons
    const classIds = [
      ...new Set([
        ...absentLessons.map((lesson) => lesson.classId.toString()),
        ...presentLessons.map((lesson) => lesson.classId.toString()),
      ]),
    ];

    // Fetch class information for each classId
    const classes = await classModel.find({
      _id: { $in: classIds.map((id) => toObjectId(id)) },
    });

    // Create a map of classId to class data
    const classMap = classes.reduce((map, classItem) => {
      map[classItem._id.toString()] = classItem;
      return map;
    }, {});
    // Attach class information to absentLessons and presentLessons
    const result = {
      absentLessons: absentLessons.map((lesson) => ({
        ...lesson,
        class: classMap[lesson.classId.toString()],
      })),
      presentLessons: presentLessons.map((lesson) => ({
        ...lesson,
        class: classMap[lesson.classId.toString()],
      })),
    };

    return result;
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
    const student = await studentModel
      .findOne({ _id: id })
      .populate("accountId")
      .lean();
    student.email = student.accountId.email;
    if (!student.address === null || student.address === undefined) {
      student.address = "";
    }
    return _.omit(student, ["accountId"]);
  }
  static async getSchedule({ studentId }) {
    return await StudentRepo.getSchedule({ studentId });
  }
  static async getTuition({ studentId }) {
    const tuition = await tuitionModel.find({
      studentId,
    });
    return tuition;
  }
}
module.exports = StudentService;
