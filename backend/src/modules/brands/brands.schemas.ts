import { z } from "zod";

import { paginationQuerySchema } from "../../common/dto/pagination.js";

export const brandListSchema = z.object({
  body: z.object({}).default({}),
  params: z.object({}).default({}),
  query: paginationQuerySchema.extend({
    search: z.string().optional()
  })
});

export const brandMutationSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    logoUrl: z.string().url().optional().or(z.literal("")),
    country: z.string().optional()
  }),
  params: z.object({ id: z.string().optional() }),
  query: z.object({}).default({})
});

