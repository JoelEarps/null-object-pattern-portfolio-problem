import { createLogger, format, transports } from "winston";

export const logger = createLogger({
  level: process.env.LEVEL,
  format: format.json(),
  transports: [new transports.Console()],
});
