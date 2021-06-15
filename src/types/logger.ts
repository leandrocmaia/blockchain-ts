import { createLogger, format, transports } from "winston";

const { combine, timestamp, printf, colorize, errors } = format;

const logger = createLogger({
  transports: [new transports.Console()],
  format: combine(
    errors({ stack: true }),
    colorize(),
    timestamp(),
    printf(({ level, message, timestamp: ts, ...rest }) => {
      return `${ts} [${level}]: ${message} ${
        Object.keys(rest).length ? JSON.stringify(rest) : ""
      }`;
    })
  ),
});

export default logger;
