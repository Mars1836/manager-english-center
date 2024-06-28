const { removeUnvalueField, toObjectId } = require("../utils");
const _ = require("lodash");
const teacherModel = require("../models/teacher.model");
const classModel = require("../models/class.model");
const lessonModel = require("../models/lesson.model");
const tuitionModel = require("../models/tuition.model");
const { BadRequestError } = require("../core/error.reponse");
const studentModel = require("../models/student.model");
const ClassService = require("./class.service");
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
  static async getStatusV3({ studentId }) {
    const classes = await ClassService.findByStudent({ studentId });
    const classIds = classes.map((item) => toObjectId(item._id));
    const tuition = await tuitionModel.find({ studentId });
    const tuitionOb = tuition.reduce((acc, cur) => {
      acc[cur.classId.toString()] = cur;
      return acc;
    }, {});
    console.log("tuition", tuitionOb);

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
      console.log(item._id);
      let ob = {
        ...item,
        ...classesOb[item._id],
        totalLesson: classesOb[item._id]?.totalLesson || 0,
        tuition: tuitionOb[item._id.toString()].last_cost,
        paid: tuitionOb[item._id.toString()].paid,
      };
      return _.omit(ob, ["lesson"]);
    });
    return a;
  }
  static async getStatusV2({ studentId }) {
    const classes = await ClassService.findByStudent({ studentId });
    console.log(classes);
    const classIds = classes.map((item) => toObjectId(item._id));
    const classesOb = classes.reduce((acc, cur) => {
      acc[cur._id.toString()] = cur;
      return acc;
    }, {});
    const tuitions = await tuitionModel.find({ studentId });
    const tuitionRe = tuitions.reduce((acc, cur) => {
      acc[cur.classId.toString()] = cur;
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
        tuition: tuitionRe[item._id.toString()].last_cost,
        paid: tuitionRe[item._id.toString()].paid,
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
        tuition: tuitionRe[item._id.toString()].last_cost,
        paid: tuitionRe[item._id.toString()].paid,
      };
      const i1 = {
        ...item,
        ...map,
        ...status,
      };
      return _.omit(i1, ["year"]);
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
    const student = await teacherModel.findOne({ _id: id });
    return student;
  }
  static async getSchedule({ studentId }) {
    const classes = await classModel
      .find({
        students: studentId,
      })
      .lean();
    const classMap = classes.map((i) => {
      return;
    });
    const classIds = classes.map((i) => {
      return i._id;
    });
    const lesson = await lessonModel
      .find({
        classId: {
          $in: classIds,
        },
      })
      .select("-createdAt -updatedAt -__v -attendance")
      .populate("teacherId")
      .populate("classId")
      .lean();
    const rs = lesson.map((item) => {
      item.name = item.classId.name;
      item.teacher = item.teacherId.name;
      return _.omit(item, ["teacherId", "classId"]);
    });
    return rs;
  }
  static async getTuition({ studentId }) {
    const tuition = await tuitionModel.find({
      studentId,
    });
    return tuition;
  }
}
module.exports = StudentService;
