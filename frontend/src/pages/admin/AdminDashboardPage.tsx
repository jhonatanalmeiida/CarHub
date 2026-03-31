import { useQuery } from "@tanstack/react-query";

import { fetchBrands, fetchModels, fetchVehicles } from "../../services/catalog";
import { PageHeader, StatCard } from "../../components/ui";

export function AdminDashboardPage() {
  const brands = useQuery({ queryKey: ["admin-brands"], queryFn: () => fetchBrands({ page: 1, limit: 50 }) });
  const models = useQuery({ queryKey: ["admin-models"], queryFn: () => fetchModels({ page: 1, limit: 50 }) });
  const vehicles = useQuery({ queryKey: ["admin-vehicles"], queryFn: () => fetchVehicles({ page: 1, limit: 50 }) });

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Painel" title="Operacao do catalogo" description="Visao executiva para administracao do conteudo automotivo." />
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Marcas" value={String(brands.data?.total || 0)} note="Base pronta para crescimento" />
        <StatCard label="Modelos" value={String(models.data?.total || 0)} note="Relacionados a fabricantes" />
        <StatCard label="Veiculos" value={String(vehicles.data?.total || 0)} note="Versoes com specs completas" />
      </div>
    </div>
  );
}

