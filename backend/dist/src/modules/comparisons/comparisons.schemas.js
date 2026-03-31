import { z } from "zod";
export const comparisonCreateSchema = z.object({
    body: z.object({
        vehicleIds: z.array(z.string()).min(2).max(3)
    }),
    params: z.object({}).default({}),
    query: z.object({}).default({})
});
