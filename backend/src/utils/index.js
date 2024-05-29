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
module.exports = { removeUnvalueField };
