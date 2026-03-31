import { Router } from "express";

import { validate } from "../../common/middleware/validate.js";
import { authGuard, roleGuard } from "../../common/guards/auth.guard.js";
import { ROLES } from "../../common/constants/roles.js";
import { brandListSchema, brandMutationSchema } from "./brands.schemas.js";
import { prisma } from "../../database/prisma.js";
import { buildPagination } from "../../common/dto/pagination.js";

export const brandsRouter = Router();

brandsRouter.get("/", validate(brandListSchema), async (req, res, next) => {
  try {
    const { page, limit, search, sortBy, sortOrder } = req.query as Record<string, string>;
    const pagination = buildPagination(Number(page), Number(limit));
    const where = search ? { name: { contains: search, mode: "insensitive" as const } } : undefined;

    const [items, total] = await Promise.all([
      prisma.brand.findMany({
        where: where as any,
        orderBy: { [sortBy || "createdAt"]: sortOrder || "desc" } as any,
        ...pagination
      }),
      prisma.brand.count({ where: where as any })
    ]);

    res.json({ items, total, page: Number(page), limit: Number(limit) });
  } catch (error) {
    next(error);
  }
});

brandsRouter.get("/:id", async (req, res, next) => {
  try {
    const id = String(req.params.id);
    const item = await prisma.brand.findUnique({
      where: { id },
      include: { models: true }
    });
    res.json(item);
  } catch (error) {
    next(error);
  }
});

brandsRouter.post("/", authGuard, roleGuard([ROLES.ADMIN]), validate(brandMutationSchema), async (req, res, next) => {
  try {
    const item = await prisma.brand.create({
      data: {
        name: req.body.name,
        logoUrl: req.body.logoUrl || null,
        country: req.body.country || null
      }
    });
    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
});

brandsRouter.patch("/:id", authGuard, roleGuard([ROLES.ADMIN]), validate(brandMutationSchema), async (req, res, next) => {
  try {
    const id = String(req.params.id);
    const item = await prisma.brand.update({
      where: { id },
      data: {
        name: req.body.name,
        logoUrl: req.body.logoUrl || null,
        country: req.body.country || null
      }
    });
    res.json(item);
  } catch (error) {
    next(error);
  }
});

brandsRouter.delete("/:id", authGuard, roleGuard([ROLES.ADMIN]), async (req, res, next) => {
  try {
    await prisma.brand.delete({ where: { id: String(req.params.id) } });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});
