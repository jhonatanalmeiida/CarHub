import { Router } from "express";
import { validate } from "../../common/middleware/validate.js";
import { authGuard, roleGuard } from "../../common/guards/auth.guard.js";
import { ROLES } from "../../common/constants/roles.js";
import { buildPagination } from "../../common/dto/pagination.js";
import { prisma } from "../../database/prisma.js";
import { catalogEnrichmentService } from "../../integrations/catalog-enrichment.service.js";
import { vehicleListSchema, vehicleMutationSchema } from "./vehicles.schemas.js";
export const vehiclesRouter = Router();
vehiclesRouter.get("/", validate(vehicleListSchema), async (req, res, next) => {
    try {
        const query = req.query;
        const page = Number(query.page);
        const limit = Number(query.limit);
        const pagination = buildPagination(page, limit);
        const where = {
            ...(query.search
                ? {
                    OR: [
                        { trim: { contains: query.search, mode: "insensitive" } },
                        { model: { name: { contains: query.search, mode: "insensitive" } } },
                        { model: { brand: { name: { contains: query.search, mode: "insensitive" } } } }
                    ]
                }
                : {}),
            ...(query.brandId ? { model: { brandId: query.brandId } } : {}),
            ...(query.modelId ? { modelId: query.modelId } : {}),
            ...(query.year ? { year: Number(query.year) } : {}),
            ...(query.priceMin || query.priceMax
                ? {
                    price: {
                        ...(query.priceMin ? { gte: Number(query.priceMin) } : {}),
                        ...(query.priceMax ? { lte: Number(query.priceMax) } : {})
                    }
                }
                : {}),
            ...(query.fuelType ? { fuelType: query.fuelType } : {}),
            ...(query.transmission ? { transmission: query.transmission } : {}),
            ...(query.bodyType ? { bodyType: query.bodyType } : {}),
            ...(query.horsepowerMin ? { horsepower: { gte: Number(query.horsepowerMin) } } : {}),
            ...(query.consumptionMin ? { consumptionHighway: { gte: Number(query.consumptionMin) } } : {}),
            ...(query.color ? { color: query.color } : {})
        };
        const [items, total] = await Promise.all([
            prisma.vehicle.findMany({
                where: where,
                include: {
                    model: {
                        include: { brand: true }
                    }
                },
                orderBy: { [query.sortBy || "createdAt"]: query.sortOrder || "desc" },
                ...pagination
            }),
            prisma.vehicle.count({ where: where })
        ]);
        res.json({ items, total, page, limit });
    }
    catch (error) {
        next(error);
    }
});
vehiclesRouter.get("/:id", async (req, res, next) => {
    try {
        const id = String(req.params.id);
        const vehicle = await prisma.vehicle.findUnique({
            where: { id },
            include: {
                model: {
                    include: { brand: true }
                }
            }
        });
        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }
        const similar = await prisma.vehicle.findMany({
            where: {
                model: {
                    brandId: vehicle.model.brandId
                },
                id: { not: vehicle.id }
            },
            include: {
                model: {
                    include: { brand: true }
                }
            },
            take: 3
        });
        const enrichment = await catalogEnrichmentService.enrichVehicle(vehicle);
        return res.json({
            ...vehicle,
            enrichment,
            similar
        });
    }
    catch (error) {
        next(error);
    }
});
vehiclesRouter.post("/", authGuard, roleGuard([ROLES.ADMIN]), validate(vehicleMutationSchema), async (req, res, next) => {
    try {
        const item = await prisma.vehicle.create({ data: req.body });
        res.status(201).json(item);
    }
    catch (error) {
        next(error);
    }
});
vehiclesRouter.patch("/:id", authGuard, roleGuard([ROLES.ADMIN]), validate(vehicleMutationSchema), async (req, res, next) => {
    try {
        const id = String(req.params.id);
        const item = await prisma.vehicle.update({
            where: { id },
            data: req.body
        });
        res.json(item);
    }
    catch (error) {
        next(error);
    }
});
vehiclesRouter.delete("/:id", authGuard, roleGuard([ROLES.ADMIN]), async (req, res, next) => {
    try {
        await prisma.vehicle.delete({ where: { id: String(req.params.id) } });
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
});
