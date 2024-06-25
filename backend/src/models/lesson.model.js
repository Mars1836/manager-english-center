const mongoose = require("mongoose"); // Erase if already required
const COLLECTION_NAME = "Lessons";
const DOCUMENT_NAME = "Lesson";
// Declare the Schema of the Mongo model
var lessonSChema = new mongoose.Schema(
  {
    // date: { type: Date, required: true },
    topic: { type: String, required: true },
    startTime: { type: String, required: true }, //"2024-06-23T14:00:00"
    endTime: { type: String, required: true }, //"2024-06-23T14:00:00"
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Teacher",
    },
    isFinished: { type: Boolean, default: false },
    absent: { type: [mongoose.Schema.Types.ObjectId], default: [] }, //student absent
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Class",
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);
// lessonSChema.virtual("class", {
//   ref: "class",
//   localField: "classId",
//   foreignField: "_id",
//   justOne: true,
// });
// lessonSChema.virtual("teacher", {
//   ref: "teacher",
//   localField: "teacherId",
//   foreignField: "_id",
//   justOne: true,
// });
lessonSChema.set("toObject", { virtuals: true });
lessonSChema.set("toJSON", { virtuals: true });
//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, lessonSChema);
