import morgan from "morgan";
import Log from "./logger.js";

morgan.token("message", (req, res) => res.locals.error_message || "");

const successResponseFormat = `:method request to :url successful. Response code: ":status", message: :message`;
const errorResponseFormat = `:method request to :url failed. Response code: ":status", with message: :message`;
const httpSuccessHandler = morgan(successResponseFormat, {
  skip: (req, res) => res.statusCode >= 400,
  stream: { write: (message) => Log.info(message.trim()) },
});

const httpErrorHandler = morgan(errorResponseFormat, {
  skip: (req, res) => res.statusCode < 400,
  stream: { write: (message) => Log.error(message.trim()) },
});

export { httpSuccessHandler, httpErrorHandler };
