import dotenv from "dotenv";
import { z } from "zod";
dotenv.config();
const envSchema = z.object({
    PORT: z.coerce.number().default(3000),
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    DATABASE_URL: z.string().min(1),
    JWT_ACCESS_SECRET: z.string().min(1),
    JWT_REFRESH_SECRET: z.string().min(1),
    JWT_ACCESS_EXPIRES_IN: z.string().default("15m"),
    JWT_REFRESH_EXPIRES_IN: z.string().default("7d"),
    CORS_ORIGIN: z.string().default("http://localhost:5173"),
    EXTERNAL_ENRICHMENT_ENABLED: z.coerce.boolean().default(false),
    UNSPLASH_ACCESS_KEY: z.string().optional(),
    FIPE_BASE_URL: z.string().default("https://brasilapi.com.br/api/fipe/preco/v1"),
    NHTSA_BASE_URL: z.string().default("https://api.nhtsa.gov")
});
export const env = envSchema.parse(process.env);
