const mongoose = require("mongoose"); // Erase if already required
const COLLECTION_NAME = "Accounts";
const DOCUMENT_NAME = "account";
// Declare the Schema of the Mongo model
var accountSchema = new mongoose.Schema(
  {
    lessons: {
      type: [
        {
          date: Date,
          topic: String,
          teacherId: mongoose.Schema.Types.ObjectId,
          isFinished: boolean,
          attendance: [studentId],
        },
      ],
      default: [],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["student", "parent", "admin"],
    },
    teacherId: {
      type: String,
      required: true,
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, accountSchema);
