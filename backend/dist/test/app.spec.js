import request from "supertest";
import { app } from "../src/app.js";
describe("application routes", () => {
    it("returns API metadata on root", async () => {
        const response = await request(app).get("/");
        expect(response.status).toBe(200);
        expect(response.body.docs).toBe("/api-docs");
    });
    it("exposes swagger UI", async () => {
        const response = await request(app).get("/api-docs/");
        expect(response.status).toBe(200);
        expect(response.text).toContain("swagger-ui");
    });
});
