const mongoose = require("mongoose"); // Erase if already required
const COLLECTION_NAME = "Lessons";
const DOCUMENT_NAME = "lesson";
// Declare the Schema of the Mongo model
var classSchema = new mongoose.Schema(
  {
    // date: { type: Date, required: true },
    topic: { type: String, required: true },
    teacherId: { type: mongoose.Schema.Types.ObjectId, required: true },
    isFinished: { type: Boolean, default: false },
    attendance: { type: [mongoose.Schema.Types.ObjectId], default: [] }, //student attendance
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

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, classSchema);
