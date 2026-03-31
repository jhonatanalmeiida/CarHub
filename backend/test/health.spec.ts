import request from "supertest";

import { app } from "../src/app.js";

describe("health", () => {
  it("returns service metadata", async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("CarHub Cloud API");
  });
});
