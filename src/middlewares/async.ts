import { Request, Response, NextFunction } from "express";

const asyncMiddleware = (fn: any) => (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  return Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncMiddleware;
