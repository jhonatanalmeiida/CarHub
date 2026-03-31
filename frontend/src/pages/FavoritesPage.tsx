import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { fetchFavorites } from "../services/catalog";
import { Button, EmptyState, PageHeader } from "../components/ui";
import { VehicleCard } from "../components/VehicleCard";

export function FavoritesPage() {
  const query = useQuery({ queryKey: ["favorites"], queryFn: fetchFavorites });

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Minha garagem"
        title="Favoritos salvos"
        description="Gerencie sua shortlist pessoal de carros para consulta rapida."
      />
      {query.data?.length ? (
        <div className="grid gap-6 lg:grid-cols-3">
          {query.data.map((item) => <VehicleCard key={item.id} vehicle={item.vehicle} isFavorite />)}
        </div>
      ) : (
        <EmptyState
          title="Sua lista ainda esta vazia"
          description="Salve seus carros favoritos para montar uma shortlist elegante e objetiva."
          action={<Link to="/catalogo"><Button>Explorar catalogo</Button></Link>}
        />
      )}
    </div>
  );
}

