import { Router } from "express";

import { authGuard, AuthenticatedRequest } from "../../common/guards/auth.guard.js";
import { validate } from "../../common/middleware/validate.js";
import { prisma } from "../../database/prisma.js";
import { comparisonCreateSchema } from "./comparisons.schemas.js";

export const comparisonsRouter = Router();

comparisonsRouter.use(authGuard);

comparisonsRouter.get("/", async (req: AuthenticatedRequest, res, next) => {
  try {
    const items = await prisma.comparison.findMany({
      where: { userId: req.user?.sub },
      include: {
        items: {
          include: {
            vehicle: {
              include: {
                model: {
                  include: { brand: true }
                }
              }
            }
          }
        }
      }
    });
    res.json(items);
  } catch (error) {
    next(error);
  }
});

comparisonsRouter.post("/", validate(comparisonCreateSchema), async (req: AuthenticatedRequest, res, next) => {
  try {
    const comparison = await prisma.comparison.create({
      data: {
        userId: req.user!.sub,
        items: {
          create: req.body.vehicleIds.map((vehicleId: string) => ({ vehicleId }))
        }
      },
      include: {
        items: {
          include: {
            vehicle: {
              include: {
                model: {
                  include: { brand: true }
                }
              }
            }
          }
        }
      }
    });
    res.status(201).json(comparison);
  } catch (error) {
    next(error);
  }
});

comparisonsRouter.get("/:id", async (req: AuthenticatedRequest, res, next) => {
  try {
    const id = String(req.params.id);
    const item = await prisma.comparison.findFirst({
      where: { id, userId: req.user!.sub },
      include: {
        items: {
          include: {
            vehicle: {
              include: {
                model: {
                  include: { brand: true }
                }
              }
            }
          }
        }
      }
    });
    res.json(item);
  } catch (error) {
    next(error);
  }
});

comparisonsRouter.delete("/:id", async (req: AuthenticatedRequest, res, next) => {
  try {
    await prisma.comparison.delete({
      where: { id: String(req.params.id) }
    });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});
