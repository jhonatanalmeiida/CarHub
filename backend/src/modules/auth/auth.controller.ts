import { Router } from "express";
import rateLimit from "express-rate-limit";

import { validate } from "../../common/middleware/validate.js";
import { authGuard, AuthenticatedRequest } from "../../common/guards/auth.guard.js";
import { authService } from "./auth.service.js";
import { loginSchema, refreshSchema, registerSchema } from "./auth.schemas.js";
import { prisma } from "../../database/prisma.js";

const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30
});

export const authRouter = Router();

authRouter.post("/register", authRateLimit, validate(registerSchema), async (req, res, next) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

authRouter.post("/login", authRateLimit, validate(loginSchema), async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

authRouter.post("/refresh", validate(refreshSchema), async (req, res, next) => {
  try {
    const result = await authService.refresh(req.body.refreshToken);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

authRouter.post("/logout", (_req, res) => {
  res.status(204).send();
});

authRouter.get("/me", authGuard, async (req: AuthenticatedRequest, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user?.sub },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });

    res.json(user);
  } catch (error) {
    next(error);
  }
});

