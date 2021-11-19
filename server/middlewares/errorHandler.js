const errorHandler = async (err, req, res, next) => {
  let code;
  let message;
  let errors;

  // console.log(err, 'ini di error handler');
  switch (err.name) {
    case "SequelizeValidationError":
      errors = err.errors.map((el) => {
        return el.message;
      });
      (code = 400), (message = errors);
      break;
    case "SequelizeUniqueConstraintError":
      errors = err.errors.map((el) => {
        return el.message;
      });
      (code = 400), (message = errors);
      break;
    case "blogNotFound":
      (code = 404), (message = 'Blog data is not found');
      break;
    case 'imageInvalid':
      code = 400, message = 'File should be an Image format and maximum size is 1,525 mb'
      break;
    default:
      (code = 500), (message = `Internal server error`);
      break;
  }
  console.log(err);
  res.status(code).json({ message: message, code: code });
};

module.exports = errorHandler;
