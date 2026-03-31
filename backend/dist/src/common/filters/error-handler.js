import { StatusCodes } from "http-status-codes";
import { AppError } from "../exceptions/app-error.js";
export function errorHandler(error, _req, res, _next) {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            message: error.message,
            details: error.details
        });
    }
    if (typeof error === "object" &&
        error !== null &&
        "code" in error &&
        typeof error.code === "string") {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Database operation failed",
            code: error.code
        });
    }
    if (error instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message
        });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Unexpected server error"
    });
}
