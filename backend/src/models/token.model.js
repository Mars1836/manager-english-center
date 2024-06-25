const mongoose = require("mongoose"); // Erase if already required
const COLLECTION_NAME = "Tokens";
const DOCUMENT_NAME = "Token";
// Declare the Schema of the Mongo model
var tokenSchema = new mongoose.Schema(
  {
    objectId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "parent", "admin", "teacher"],
      required: true,
    },
    key: {
      type: String,
      required: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
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
module.exports = mongoose.model(DOCUMENT_NAME, tokenSchema);
