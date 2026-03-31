import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";
import { AppError } from "../exceptions/app-error.js";
export function authGuard(req, _res, next) {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return next(new AppError(StatusCodes.UNAUTHORIZED, "Missing authorization header"));
    }
    const [, token] = authorization.split(" ");
    if (!token) {
        return next(new AppError(StatusCodes.UNAUTHORIZED, "Invalid authorization format"));
    }
    try {
        req.user = jwt.verify(token, env.JWT_ACCESS_SECRET);
        return next();
    }
    catch {
        return next(new AppError(StatusCodes.UNAUTHORIZED, "Invalid or expired token"));
    }
}
export function roleGuard(allowedRoles) {
    return (req, _res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return next(new AppError(StatusCodes.FORBIDDEN, "Insufficient permissions"));
        }
        return next();
    };
}
