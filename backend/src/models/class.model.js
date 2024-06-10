const mongoose = require("mongoose"); // Erase if already required
const COLLECTION_NAME = "Classes";
const DOCUMENT_NAME = "class";
// Declare the Schema of the Mongo model
var classSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    grade: {
      type: Number,
      required: true,
    },
    students: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "student",
      default: [],
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
