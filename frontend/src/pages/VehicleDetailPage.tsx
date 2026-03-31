import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { fetchVehicle } from "../services/catalog";
import { Badge, Button, Card, EmptyState, PageHeader } from "../components/ui";
import { VehicleCard } from "../components/VehicleCard";

export function VehicleDetailPage() {
  const { id = "" } = useParams();
  const query = useQuery({ queryKey: ["vehicle", id], queryFn: () => fetchVehicle(id), enabled: Boolean(id) });

  if (!query.data && query.isLoading) {
    return <div className="surface-soft h-96 animate-pulse rounded-3xl" />;
  }

  if (!query.data) {
    return <EmptyState title="Veiculo indisponivel" description="Nao conseguimos carregar este carro agora." />;
  }

  const vehicle = query.data;

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow={vehicle.model.brand.name}
        title={`${vehicle.model.name} ${vehicle.trim}`}
        description={vehicle.description}
        actions={<Badge>{vehicle.year}</Badge>}
      />
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="overflow-hidden p-0">
          <img src={vehicle.imageUrl} alt={vehicle.trim} className="h-[420px] w-full object-cover" />
        </Card>
        <Card className="space-y-5">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-muted">Preco</p>
            <p className="mt-2 font-display text-4xl">
              {vehicle.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {[
              ["Combustivel", vehicle.fuelType],
              ["Transmissao", vehicle.transmission],
              ["Motor", vehicle.engine],
              ["Potencia", `${vehicle.horsepower} cv`],
              ["Torque", `${vehicle.torque} kgfm`],
              ["Consumo rodovia", `${vehicle.consumptionHighway} km/l`]
            ].map(([label, value]) => (
              <div key={label} className="surface-soft rounded-2xl p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-muted">{label}</p>
                <p className="mt-2 font-semibold">{value}</p>
              </div>
            ))}
          </div>
          <Button className="w-full">Adicionar aos favoritos</Button>
        </Card>
      </div>
      <section className="grid gap-4 md:grid-cols-4">
        {[
          ["Portas", `${vehicle.doors}`],
          ["Porta-malas", `${vehicle.trunkCapacity} L`],
          ["Carroceria", vehicle.bodyType],
          ["Cor", vehicle.color]
        ].map(([label, value]) => (
          <Card key={label}>
            <p className="text-sm text-muted">{label}</p>
            <p className="mt-2 font-display text-2xl">{value}</p>
          </Card>
        ))}
      </section>
      <section className="space-y-6">
        <PageHeader eyebrow="Similares" title="Outros carros para comparar" description="Recomendacoes relacionadas por marca." />
        <div className="grid gap-6 lg:grid-cols-3">
          {vehicle.similar.map((item) => <VehicleCard key={item.id} vehicle={item} />)}
        </div>
      </section>
    </div>
  );
}
