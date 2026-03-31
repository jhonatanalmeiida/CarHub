import { Router } from "express";

import { authGuard, AuthenticatedRequest } from "../../common/guards/auth.guard.js";
import { prisma } from "../../database/prisma.js";

export const favoritesRouter = Router();

favoritesRouter.use(authGuard);

favoritesRouter.get("/", async (req: AuthenticatedRequest, res, next) => {
  try {
    const items = await prisma.favorite.findMany({
      where: { userId: req.user?.sub },
      include: {
        vehicle: {
          include: {
            model: {
              include: { brand: true }
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

favoritesRouter.post("/:vehicleId", async (req: AuthenticatedRequest, res, next) => {
  try {
    const vehicleId = String(req.params.vehicleId);
    const item = await prisma.favorite.upsert({
      where: {
        userId_vehicleId: {
          userId: req.user!.sub,
          vehicleId
        }
      },
      create: {
        userId: req.user!.sub,
        vehicleId
      },
      update: {}
    });
    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
});

favoritesRouter.delete("/:vehicleId", async (req: AuthenticatedRequest, res, next) => {
  try {
    const vehicleId = String(req.params.vehicleId);
    await prisma.favorite.delete({
      where: {
        userId_vehicleId: {
          userId: req.user!.sub,
          vehicleId
        }
      }
    });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});
