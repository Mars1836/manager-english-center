const { removeUnvalueField, toObjectId } = require("../utils");

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
  static async getStatusV2({ studentId }) {
    const classes = await ClassService.findByStudent({ studentId });
    const classIds = classes.map((item) => toObjectId(item._id));
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
          countAbsent: {
            $sum: {
              $cond: {
                if: { $in: [toObjectId(studentId), "$absent"] },
                then: 1,
                else: 0,
              },
            },
          },
          countPresent: {
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
      return { ...item, ...classesOb[item._id] };
    });
    return a;
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
    console.log(lessonResults);
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
