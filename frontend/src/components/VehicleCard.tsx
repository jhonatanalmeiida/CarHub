import { Heart, Scale, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Vehicle } from "../types";
import { Badge, Button, Card } from "./ui";
import { useComparison } from "../contexts/ComparisonContext";

export function VehicleCard({
  vehicle,
  onFavorite,
  isFavorite
}: {
  vehicle: Vehicle;
  onFavorite?: (vehicleId: string) => void;
  isFavorite?: boolean;
}) {
  const { selectedIds, toggle } = useComparison();
  const isSelected = selectedIds.includes(vehicle.id);

  return (
    <Card className="overflow-hidden p-0">
      <img src={vehicle.imageUrl} alt={vehicle.trim} className="h-56 w-full object-cover" />
      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm text-muted">{vehicle.model.brand.name}</p>
            <h3 className="font-display text-2xl">
              {vehicle.model.name} {vehicle.trim}
            </h3>
          </div>
          <Badge>{vehicle.year}</Badge>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm text-muted">
          <span>{vehicle.fuelType}</span>
          <span>{vehicle.transmission}</span>
          <span>{vehicle.bodyType}</span>
          <span>{vehicle.horsepower} cv</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted">Preco</p>
            <p className="mt-1 text-2xl font-semibold">
              {vehicle.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onFavorite?.(vehicle.id)}
              className="rounded-full border border-app p-3 text-muted transition hover:bg-[rgb(var(--surface-soft))] hover:text-[rgb(var(--text))]"
            >
              <Heart className={`h-4 w-4 ${isFavorite ? "fill-current text-rose-400" : ""}`} />
            </button>
            <button
              onClick={() => toggle(vehicle.id)}
              className={`rounded-full border p-3 transition ${isSelected ? "border-accent text-accent" : "border-app text-muted"}`}
            >
              <Scale className="h-4 w-4" />
            </button>
          </div>
        </div>
        <Link to={`/catalogo/${vehicle.id}`} className="block">
          <Button className="w-full">
            Ver detalhes
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </Card>
  );
}
