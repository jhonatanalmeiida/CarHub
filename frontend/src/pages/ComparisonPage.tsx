import { useQuery } from "@tanstack/react-query";

import { useComparison } from "../contexts/ComparisonContext";
import { fetchVehicle } from "../services/catalog";
import { Button, EmptyState, PageHeader, Table } from "../components/ui";

const comparisonRows = [
  { label: "Preco", value: (vehicle: any) => vehicle.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) },
  { label: "Potencia", value: (vehicle: any) => `${vehicle.horsepower} cv` },
  { label: "Torque", value: (vehicle: any) => `${vehicle.torque} kgfm` },
  { label: "Consumo urbano", value: (vehicle: any) => `${vehicle.consumptionCity} km/l` },
  { label: "Consumo rodovia", value: (vehicle: any) => `${vehicle.consumptionHighway} km/l` },
  { label: "Porta-malas", value: (vehicle: any) => `${vehicle.trunkCapacity} L` }
];

export function ComparisonPage() {
  const { selectedIds, clear } = useComparison();
  const query = useQuery({
    queryKey: ["comparison-details", selectedIds],
    queryFn: async () => Promise.all(selectedIds.map((id) => fetchVehicle(id))),
    enabled: selectedIds.length >= 2
  });

  if (selectedIds.length < 2) {
    return (
      <EmptyState
        title="Selecione 2 ou 3 carros"
        description="Use o botao de comparacao nos cards do catalogo para montar sua analise lado a lado."
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Comparacao"
        title="Analise tecnica lado a lado"
        description="Destaques visuais ajudam a identificar rapidamente o melhor atributo por categoria."
        actions={<Button variant="secondary" onClick={clear}>Limpar selecao</Button>}
      />
      {query.data ? (
        <Table
          headers={["Atributo", ...query.data.map((vehicle) => `${vehicle.model.name} ${vehicle.trim}`)]}
          rows={comparisonRows.map((row) => [row.label, ...query.data.map((vehicle) => row.value(vehicle))])}
        />
      ) : null}
    </div>
  );
}

