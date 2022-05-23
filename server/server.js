import app from "./config/express.js";
import Log from "./config/logger.js";

const server = app.listen(8080, () => {
  Log.debug("Server is up and running @ http://localhost:8080`");
});

const unexpectedErrorHandler = (error) => {
  if (server) {
    Log.error(`Something went wrong with the server. ${error}`);
    server.close(() => {
      Log.error("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};
// listen for server events
process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  Log.debug("SIGTERM signal received: closing HTTP server");
  if (server) {
    Log.debug("HTTP server closed");
    server.close();
  }
});
