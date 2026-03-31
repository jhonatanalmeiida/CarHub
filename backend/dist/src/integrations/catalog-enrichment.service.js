export const catalogEnrichmentService = {
    async enrichVehicle(vehicle) {
        return {
            source: "internal",
            vehicle
        };
    }
};
