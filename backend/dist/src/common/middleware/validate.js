import { StatusCodes } from "http-status-codes";
import { AppError } from "../exceptions/app-error.js";
export function validate(schema) {
    return (req, _res, next) => {
        const result = schema.safeParse({
            body: req.body,
            query: req.query,
            params: req.params
        });
        if (!result.success) {
            return next(new AppError(StatusCodes.BAD_REQUEST, result.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join(", ")));
        }
        req.body = result.data.body;
        req.query = result.data.query;
        req.params = result.data.params;
        return next();
    };
}
