import { Router } from "express";

import { validate } from "../../common/middleware/validate.js";
import { authGuard, roleGuard } from "../../common/guards/auth.guard.js";
import { ROLES } from "../../common/constants/roles.js";
import { buildPagination } from "../../common/dto/pagination.js";
import { prisma } from "../../database/prisma.js";
import { modelListSchema, modelMutationSchema } from "./models.schemas.js";

export const modelsRouter = Router();

modelsRouter.get("/", validate(modelListSchema), async (req, res, next) => {
  try {
    const { page, limit, sortBy, sortOrder, brandId, search } = req.query as Record<string, string>;
    const pagination = buildPagination(Number(page), Number(limit));
    const where = {
      ...(brandId ? { brandId } : {}),
      ...(search ? { name: { contains: search, mode: "insensitive" as const } } : {})
    };

    const [items, total] = await Promise.all([
      prisma.carModel.findMany({
        where: where as any,
        include: { brand: true, _count: { select: { vehicles: true } } },
        orderBy: { [sortBy || "createdAt"]: sortOrder || "desc" } as any,
        ...pagination
      }),
      prisma.carModel.count({ where: where as any })
    ]);

    res.json({ items, total, page: Number(page), limit: Number(limit) });
  } catch (error) {
    next(error);
  }
});

modelsRouter.get("/:id", async (req, res, next) => {
  try {
    const id = String(req.params.id);
    const item = await prisma.carModel.findUnique({
      where: { id },
      include: { brand: true, vehicles: true }
    });
    res.json(item);
  } catch (error) {
    next(error);
  }
});

modelsRouter.post("/", authGuard, roleGuard([ROLES.ADMIN]), validate(modelMutationSchema), async (req, res, next) => {
  try {
    const item = await prisma.carModel.create({ data: req.body as any });
    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
});

modelsRouter.patch("/:id", authGuard, roleGuard([ROLES.ADMIN]), validate(modelMutationSchema), async (req, res, next) => {
  try {
    const id = String(req.params.id);
    const item = await prisma.carModel.update({
      where: { id },
      data: req.body as any
    });
    res.json(item);
  } catch (error) {
    next(error);
  }
});

modelsRouter.delete("/:id", authGuard, roleGuard([ROLES.ADMIN]), async (req, res, next) => {
  try {
    await prisma.carModel.delete({ where: { id: String(req.params.id) } });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});
