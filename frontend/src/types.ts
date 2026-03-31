export type Role = "USER" | "ADMIN";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface Brand {
  id: string;
  name: string;
  logoUrl?: string | null;
  country?: string | null;
}

export interface CarModel {
  id: string;
  name: string;
  category: string;
  yearStart: number;
  yearEnd?: number | null;
  brandId: string;
  brand: Brand;
}

export interface Vehicle {
  id: string;
  trim: string;
  year: number;
  price: number;
  fuelType: string;
  transmission: string;
  bodyType: string;
  horsepower: number;
  torque: number;
  engine: string;
  consumptionCity: number;
  consumptionHighway: number;
  doors: number;
  trunkCapacity: number;
  color: string;
  imageUrl: string;
  description: string;
  model: CarModel;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

