import winston, { createLogger, format, transports } from "winston";
import path from 'path';
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

winston.addColors(colors);

//Format log message
const _format = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.printf(
    ({ level, message, timestamp }) => `[${timestamp}] ${level}: ${message}`
  )
);

let silent;
switch (process.env.NODE_ENV) {
  case "production":
    silent = false;
    break;
  case "test":
    silent = true;
    break;
  default:
    silent = false;
    break;
}

//Logs output
const _transports = [
  new transports.Console({
    format: format.combine(format.colorize({ all: true })),
    silent,
  }),
  new transports.File({
    filename: "../server/log/error.log",
    level: "error",
  }),
  new transports.File({
    filename: "../server/log/server.log",
  }),
];

const Log = createLogger({
  level: "debug",
  levels,
  format: _format,
  transports: _transports,
});

export default Log;
