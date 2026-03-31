import { z } from "zod";
import { paginationQuerySchema } from "../../common/dto/pagination.js";
export const vehicleListSchema = z.object({
    body: z.object({}).default({}),
    params: z.object({}).default({}),
    query: paginationQuerySchema.extend({
        search: z.string().optional(),
        brandId: z.string().optional(),
        modelId: z.string().optional(),
        year: z.coerce.number().int().optional(),
        priceMin: z.coerce.number().optional(),
        priceMax: z.coerce.number().optional(),
        fuelType: z.string().optional(),
        transmission: z.string().optional(),
        bodyType: z.string().optional(),
        horsepowerMin: z.coerce.number().optional(),
        consumptionMin: z.coerce.number().optional(),
        color: z.string().optional()
    })
});
export const vehicleMutationSchema = z.object({
    body: z.object({
        modelId: z.string().min(1),
        trim: z.string().min(2),
        year: z.coerce.number().int(),
        price: z.coerce.number().positive(),
        fuelType: z.string().min(2),
        transmission: z.string().min(2),
        bodyType: z.string().min(2),
        horsepower: z.coerce.number().int().positive(),
        torque: z.coerce.number().int().positive(),
        engine: z.string().min(2),
        consumptionCity: z.coerce.number().positive(),
        consumptionHighway: z.coerce.number().positive(),
        doors: z.coerce.number().int().positive(),
        trunkCapacity: z.coerce.number().int().positive(),
        color: z.string().min(2),
        imageUrl: z.string().url(),
        description: z.string().min(20)
    }),
    params: z.object({ id: z.string().optional() }),
    query: z.object({}).default({})
});
