import { NextFunction, Request, Response } from "express";
import logger from "../types/logger";

const loggerMiddleware = (
  req: Request,
  resp: Response,
  next: NextFunction
): void => {
  logger.info(`${req.method} ${req.path}`);
  next();
};

export default loggerMiddleware;
