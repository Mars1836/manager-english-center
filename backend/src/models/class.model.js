const mongoose = require("mongoose"); // Erase if already required
const COLLECTION_NAME = "Classes";
const DOCUMENT_NAME = "Class";
// Declare the Schema of the Mongo model
var classSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    year: {
      type: Number,
      required: true,
    },
    maxStudents: {
      type: Number,
      default: 50,
    },
    grade: {
      type: Number,
      required: true,
    },
    tuition: {
      type: Number,
      required: true,
    },
    students: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "student",
      default: [],
    },
    status: {
      type: String,
      enum: ["open", "close", "end"],
      default: "open",
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);
classSchema.virtual("lesson", {
  ref: "lesson",
  localField: "_id",
  foreignField: "classId",
});

classSchema.set("toObject", { virtuals: true });
classSchema.set("toJSON", { virtuals: true });
//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, classSchema);
