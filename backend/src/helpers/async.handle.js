const asyncHandle = (f) => {
  return (req, res, next) => {
    f(req, res, next).catch((error) => {
      next(error);
    });
  };
};
module.exports = asyncHandle;
