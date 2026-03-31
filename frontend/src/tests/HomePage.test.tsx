import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { vi } from "vitest";

import { HomePage } from "../pages/HomePage";

vi.mock("../services/catalog", () => ({
  fetchVehicles: async () => ({ items: [], total: 0, page: 1, limit: 3 }),
  fetchBrands: async () => ({ items: [], total: 0, page: 1, limit: 6 })
}));

describe("HomePage", () => {
  it("renders hero title", async () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(await screen.findByText(/Seu showroom inteligente/i)).toBeInTheDocument();
  });
});
