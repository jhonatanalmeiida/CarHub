import { z } from "zod";
import { paginationQuerySchema } from "../../common/dto/pagination.js";
export const modelListSchema = z.object({
    body: z.object({}).default({}),
    params: z.object({}).default({}),
    query: paginationQuerySchema.extend({
        brandId: z.string().optional(),
        search: z.string().optional()
    })
});
export const modelMutationSchema = z.object({
    body: z.object({
        name: z.string().min(2),
        brandId: z.string().min(1),
        category: z.string().min(2),
        yearStart: z.coerce.number().int(),
        yearEnd: z.coerce.number().int().optional().nullable()
    }),
    params: z.object({ id: z.string().optional() }),
    query: z.object({}).default({})
});
