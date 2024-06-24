const { default: mongoose } = require("mongoose");

function removeUnvalueField(_object) {
  for (const key in _object) {
    if (_object[key] === null || _object[key] === undefined) {
      delete _object[key];
    }
    if (typeof _object[key] === "object")
      return removeUnvalueField(_object[key]);
  }
  return;
}
function toObjectId(id) {
  return new mongoose.Types.ObjectId(id);
}
module.exports = { removeUnvalueField, toObjectId };
