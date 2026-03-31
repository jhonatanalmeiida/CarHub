import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SlidersHorizontal } from "lucide-react";

import { fetchBrands, fetchFavorites, fetchVehicles, toggleFavorite } from "../services/catalog";
import {
  Button,
  Drawer,
  EmptyState,
  FilterChip,
  PageHeader,
  Pagination,
  SearchBar,
  Select,
  Skeleton
} from "../components/ui";
import { VehicleCard } from "../components/VehicleCard";
import { useDebounce } from "../hooks/useDebounce";
import { useToast } from "../contexts/ToastContext";
import { useAuth } from "../contexts/AuthContext";

const initialFilters = {
  search: "",
  brandId: "",
  transmission: "",
  fuelType: "",
  bodyType: "",
  color: "",
  year: "",
  priceMax: ""
};

export function CatalogPage() {
  const [filters, setFilters] = useState(initialFilters);
  const [page, setPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const debouncedSearch = useDebounce(filters.search, 350);
  const { push } = useToast();
  const { isAuthenticated } = useAuth();

  const query = useQuery({
    queryKey: ["vehicles", page, debouncedSearch, filters],
    queryFn: () =>
      fetchVehicles({
        page,
        limit: 9,
        search: debouncedSearch || undefined,
        brandId: filters.brandId || undefined,
        transmission: filters.transmission || undefined,
        fuelType: filters.fuelType || undefined,
        bodyType: filters.bodyType || undefined,
        color: filters.color || undefined,
        year: filters.year || undefined,
        priceMax: filters.priceMax || undefined
      })
  });

  const brandsQuery = useQuery({ queryKey: ["brands"], queryFn: () => fetchBrands({ limit: 30, page: 1 }) });
  const favoritesQuery = useQuery({
    queryKey: ["favorites"],
    queryFn: fetchFavorites,
    enabled: isAuthenticated
  });

  const favoriteIds = useMemo(
    () => new Set((favoritesQuery.data || []).map((item) => item.vehicle.id)),
    [favoritesQuery.data]
  );

  const activeFilters = Object.entries(filters).filter(([, value]) => value);

  const filterPanel = (
    <div className="space-y-4">
      <Select value={filters.brandId} onChange={(event) => setFilters((current) => ({ ...current, brandId: event.target.value }))}>
        <option value="">Todas as marcas</option>
        {brandsQuery.data?.items.map((brand) => <option key={brand.id} value={brand.id}>{brand.name}</option>)}
      </Select>
      <Select value={filters.transmission} onChange={(event) => setFilters((current) => ({ ...current, transmission: event.target.value }))}>
        <option value="">Transmissao</option>
        <option value="CVT">CVT</option>
        <option value="Automatica">Automatica</option>
      </Select>
      <Select value={filters.fuelType} onChange={(event) => setFilters((current) => ({ ...current, fuelType: event.target.value }))}>
        <option value="">Combustivel</option>
        <option value="Flex">Flex</option>
        <option value="Gasolina">Gasolina</option>
      </Select>
      <Select value={filters.bodyType} onChange={(event) => setFilters((current) => ({ ...current, bodyType: event.target.value }))}>
        <option value="">Carroceria</option>
        <option value="Sedan">Sedan</option>
        <option value="SUV">SUV</option>
      </Select>
      <Select value={filters.color} onChange={(event) => setFilters((current) => ({ ...current, color: event.target.value }))}>
        <option value="">Cor</option>
        <option value="Cinza Aco">Cinza Aco</option>
        <option value="Branco">Branco</option>
        <option value="Azul Profundo">Azul Profundo</option>
      </Select>
      <Select value={filters.year} onChange={(event) => setFilters((current) => ({ ...current, year: event.target.value }))}>
        <option value="">Ano</option>
        <option value="2024">2024</option>
      </Select>
      <Select value={filters.priceMax} onChange={(event) => setFilters((current) => ({ ...current, priceMax: event.target.value }))}>
        <option value="">Faixa de preco</option>
        <option value="160000">Ate R$ 160 mil</option>
        <option value="200000">Ate R$ 200 mil</option>
      </Select>
      <Button variant="secondary" className="w-full" onClick={() => setFilters(initialFilters)}>
        Limpar filtros
      </Button>
    </div>
  );

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Catalogo"
        title="Encontre o carro certo com filtros combinaveis"
        description="Busca global, sidebar inteligente, cards premium e estados de interface bem tratados."
        actions={
          <Button variant="secondary" className="md:hidden" onClick={() => setDrawerOpen(true)}>
            <SlidersHorizontal className="mr-2 h-4 w-4" /> Filtros
          </Button>
        }
      />
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-3xl border border-app surface p-5">{filterPanel}</div>
        </aside>
        <div className="space-y-6">
          <SearchBar value={filters.search} onChange={(search) => setFilters((current) => ({ ...current, search }))} />
          <div className="flex flex-wrap gap-2">
            {activeFilters.map(([key, value]) => (
              <FilterChip key={key} label={`${key}: ${value}`} onRemove={() => setFilters((current) => ({ ...current, [key]: "" }))} />
            ))}
          </div>
          {query.isLoading ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => <Skeleton key={index} className="h-[420px]" />)}
            </div>
          ) : query.data?.items.length ? (
            <>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {query.data.items.map((vehicle) => (
                  <VehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                    isFavorite={favoriteIds.has(vehicle.id)}
                    onFavorite={async (vehicleId) => {
                      if (!isAuthenticated) {
                        push("Entre para salvar favoritos.");
                        return;
                      }
                      await toggleFavorite(vehicleId, favoriteIds.has(vehicleId));
                      favoritesQuery.refetch();
                      push("Favoritos atualizados.");
                    }}
                  />
                ))}
              </div>
              <Pagination page={query.data.page} total={query.data.total} limit={query.data.limit} onPageChange={setPage} />
            </>
          ) : (
            <EmptyState
              title="Nenhum carro encontrado"
              description="Ajuste os filtros ou tente uma busca mais ampla para descobrir novas opcoes."
            />
          )}
        </div>
      </div>
      <Drawer open={drawerOpen} title="Filtros" onClose={() => setDrawerOpen(false)}>
        {filterPanel}
      </Drawer>
    </div>
  );
}

