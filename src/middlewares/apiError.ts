import { NextFunction, Request, Response } from "express";
import { HttpApiException } from "../types";

function errorMiddleware(
  error: HttpApiException,
  request: Request,
  response: Response,
  next: NextFunction
) {
  const status = error.statusCode || 500;
  const message = error.message || "Something went wrong";
  response.status(status).send({
    message,
    status,
  });
}

export default errorMiddleware;
