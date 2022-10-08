import { Request, Response, NextFunction } from "express";
import JwtClient from "../../shared/services/JWT";
import AppError from "../../shared/utils/AppError";

const auth = (request: Request, response: Response, next: NextFunction) => {
  let token = request.headers["authorization"];

  if (!token) {
    throw new AppError("No token provided", 401);
  }

  token = token.replace("Bearer ", "");

  const user = new JwtClient().verifyAccessToken(token);
  request.user = user.id;
  return next();
};

export default auth;
