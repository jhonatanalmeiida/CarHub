import { api } from "./api";
import { Brand, CarModel, PaginatedResponse, Vehicle } from "../types";

function normalizeVehicle(vehicle: any): Vehicle {
  return {
    ...vehicle,
    price: Number(vehicle.price),
    consumptionCity: Number(vehicle.consumptionCity),
    consumptionHighway: Number(vehicle.consumptionHighway)
  };
}

export async function fetchVehicles(params?: Record<string, string | number | undefined>) {
  const { data } = await api.get<PaginatedResponse<Vehicle>>("/vehicles", { params });
  return {
    ...data,
    items: data.items.map(normalizeVehicle)
  };
}

export async function fetchVehicle(id: string) {
  const { data } = await api.get<Vehicle & { similar: Vehicle[] }>("/vehicles/" + id);
  return {
    ...normalizeVehicle(data),
    similar: data.similar.map(normalizeVehicle)
  };
}

export async function fetchBrands(params?: Record<string, string | number | undefined>) {
  const { data } = await api.get<PaginatedResponse<Brand>>("/brands", { params });
  return data;
}

export async function fetchModels(params?: Record<string, string | number | undefined>) {
  const { data } = await api.get<PaginatedResponse<CarModel>>("/models", { params });
  return data;
}

export async function fetchFavorites() {
  const { data } = await api.get<Array<{ id: string; vehicle: Vehicle }>>("/favorites");
  return data.map((item) => ({
    ...item,
    vehicle: normalizeVehicle(item.vehicle)
  }));
}

export async function toggleFavorite(vehicleId: string, active: boolean) {
  if (active) {
    await api.delete("/favorites/" + vehicleId);
    return;
  }
  await api.post("/favorites/" + vehicleId);
}

export async function createComparison(vehicleIds: string[]) {
  const { data } = await api.post("/comparisons", { vehicleIds });
  return data;
}

export async function createBrand(payload: { name: string; logoUrl?: string; country?: string }) {
  const { data } = await api.post("/brands", payload);
  return data;
}

export async function updateBrand(id: string, payload: { name: string; logoUrl?: string; country?: string }) {
  const { data } = await api.patch("/brands/" + id, payload);
  return data;
}

export async function deleteBrand(id: string) {
  await api.delete("/brands/" + id);
}

export async function createModel(payload: {
  name: string;
  brandId: string;
  category: string;
  yearStart: number;
  yearEnd?: number | null;
}) {
  const { data } = await api.post("/models", payload);
  return data;
}

export async function updateModel(
  id: string,
  payload: { name: string; brandId: string; category: string; yearStart: number; yearEnd?: number | null }
) {
  const { data } = await api.patch("/models/" + id, payload);
  return data;
}

export async function deleteModel(id: string) {
  await api.delete("/models/" + id);
}

export async function createVehicle(payload: Record<string, unknown>) {
  const { data } = await api.post("/vehicles", payload);
  return data;
}

export async function updateVehicle(id: string, payload: Record<string, unknown>) {
  const { data } = await api.patch("/vehicles/" + id, payload);
  return data;
}

export async function deleteVehicle(id: string) {
  await api.delete("/vehicles/" + id);
}
