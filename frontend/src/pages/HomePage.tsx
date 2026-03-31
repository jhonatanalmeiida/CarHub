import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Sparkles, Zap, LucideIcon } from "lucide-react";

import { fetchBrands, fetchVehicles } from "../services/catalog";
import { Badge, Button, Card, PageHeader } from "../components/ui";
import { VehicleCard } from "../components/VehicleCard";

export function HomePage() {
  const vehiclesQuery = useQuery({ queryKey: ["vehicles", "featured"], queryFn: () => fetchVehicles({ limit: 3, page: 1 }) });
  const brandsQuery = useQuery({ queryKey: ["brands", "popular"], queryFn: () => fetchBrands({ limit: 6, page: 1 }) });

  return (
    <div className="space-y-12">
      <section className="overflow-hidden rounded-[2rem] border border-app bg-hero-grid px-6 py-10 md:px-10 md:py-14">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <Badge className="border-accent/40 text-accent">Cloud-native automotive experience</Badge>
            <h1 className="mt-5 max-w-3xl font-display text-5xl leading-tight md:text-6xl">
              Seu showroom inteligente para descobrir, comparar e salvar carros com UX premium.
            </h1>
            <p className="mt-5 max-w-2xl text-base text-muted">
              Explore marcas, filtros avancados, detalhes tecnicos e comparacao lado a lado em uma experiencia desenhada para parecer produto real.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/catalogo"><Button>Explorar catalogo</Button></Link>
              <Link to="/cadastro"><Button variant="secondary">Criar conta</Button></Link>
            </div>
          </div>
          <Card className="space-y-4">
            <p className="text-xs uppercase tracking-[0.35em] text-accent">Diferenciais</p>
            <div className="grid gap-4">
              {([
                ["Busca instantanea", Sparkles],
                ["Comparacao estrategica", ShieldCheck],
                ["Arquitetura pronta para escala", Zap]
              ] as Array<[string, LucideIcon]>).map(([label, Icon]) => (
                <div key={label} className="surface-soft flex items-center gap-4 rounded-3xl p-4">
                  <div className="rounded-2xl bg-accent/15 p-3 text-accent">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">{label}</p>
                    <p className="text-sm text-muted">Dados, UX e engenharia para demo de banca ou evolucao real.</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="space-y-6">
        <PageHeader
          eyebrow="Destaques"
          title="Modelos em alta no CarHub Cloud"
          description="Cards premium com acesso rapido a specs, favoritos e comparacao."
          actions={<Link to="/catalogo"><Button variant="secondary">Ver todos</Button></Link>}
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {vehiclesQuery.data?.items.map((vehicle) => <VehicleCard key={vehicle.id} vehicle={vehicle} />)}
        </div>
      </section>

      <section className="space-y-6">
        <PageHeader
          eyebrow="Marcas"
          title="Marcas populares"
          description="Uma base orientada ao dominio automotivo, pronta para expansao."
        />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {brandsQuery.data?.items.map((brand) => (
            <Card key={brand.id}>
              <p className="font-display text-2xl">{brand.name}</p>
              <p className="mt-2 text-sm text-muted">{brand.country || "Origem global"}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <Card>
          <p className="text-xs uppercase tracking-[0.35em] text-accent">Recomendados</p>
          <h2 className="mt-3 font-display text-3xl">Filtros inteligentes para leitura rapida</h2>
          <p className="mt-3 text-sm text-muted">
            Filtre por preco, potencia, combustivel, transmissao e consumo para chegar mais rapido ao carro ideal.
          </p>
        </Card>
        <Card className="flex flex-col justify-between">
          <div>
            <p className="font-display text-2xl">Pronto para salvar favoritos?</p>
            <p className="mt-3 text-sm text-muted">
              Crie uma conta para acompanhar sua shortlist e comparar 2 ou 3 carros lado a lado.
            </p>
          </div>
          <Link to="/cadastro" className="mt-6 inline-flex items-center gap-2 text-accent">
            Comecar agora <ArrowRight className="h-4 w-4" />
          </Link>
        </Card>
      </section>
    </div>
  );
}
