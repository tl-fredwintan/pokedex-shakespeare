import ApiError from "../utils/ApiError.js";
import Log from "../../config/logger.js";

const errorConvert = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || 500;
    const message = error.message;
    error = new ApiError(statusCode, message);
  }
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;

  //assign message data to local variable scoped within app
  res.locals.error_message = err.message;

  const response = {
    code: statusCode,
    message,
  };

  Log.error(err);

  res.status(statusCode).send(response);
};

export { errorHandler, errorConvert };
