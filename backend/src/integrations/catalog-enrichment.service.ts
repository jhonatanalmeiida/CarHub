export const catalogEnrichmentService = {
  async enrichVehicle<T>(vehicle: T) {
    return {
      source: "internal",
      vehicle
    };
  }
};

