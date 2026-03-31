import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

import { env } from "../../config/env.js";
import { AppError } from "../exceptions/app-error.js";

export interface AuthPayload {
  sub: string;
  email: string;
  role: string;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthPayload;
}

export function authGuard(req: AuthenticatedRequest, _res: Response, next: NextFunction) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return next(new AppError(StatusCodes.UNAUTHORIZED, "Missing authorization header"));
  }

  const [, token] = authorization.split(" ");

  if (!token) {
    return next(new AppError(StatusCodes.UNAUTHORIZED, "Invalid authorization format"));
  }

  try {
    req.user = jwt.verify(token, env.JWT_ACCESS_SECRET) as AuthPayload;
    return next();
  } catch {
    return next(new AppError(StatusCodes.UNAUTHORIZED, "Invalid or expired token"));
  }
}

export function roleGuard(allowedRoles: string[]) {
  return (req: AuthenticatedRequest, _res: Response, next: NextFunction) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return next(new AppError(StatusCodes.FORBIDDEN, "Insufficient permissions"));
    }

    return next();
  };
}

