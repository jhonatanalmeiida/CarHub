import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { createVehicle, deleteVehicle, fetchModels, fetchVehicles, updateVehicle } from "../../services/catalog";
import { Button, ConfirmDialog, Input, Modal, PageHeader, Select, Table } from "../../components/ui";
import { useToast } from "../../contexts/ToastContext";

export function AdminVehiclesPage() {
  const query = useQuery({ queryKey: ["vehicles-admin-list"], queryFn: () => fetchVehicles({ page: 1, limit: 20 }) });
  const models = useQuery({ queryKey: ["vehicle-models"], queryFn: () => fetchModels({ page: 1, limit: 50 }) });
  const [open, setOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editing, setEditing] = useState<Record<string, any> | null>(null);
  const { push } = useToast();
  const current = editing || {
    modelId: "",
    trim: "",
    year: 2024,
    price: 0,
    fuelType: "Flex",
    transmission: "Automatica",
    bodyType: "SUV",
    horsepower: 150,
    torque: 20,
    engine: "",
    consumptionCity: 10,
    consumptionHighway: 12,
    doors: 4,
    trunkCapacity: 400,
    color: "",
    imageUrl: "",
    description: ""
  };

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Admin"
        title="CRUD de veiculos"
        description="Controle de versoes, precos e atributos tecnicos do catalogo."
        actions={<Button onClick={() => { setEditing({ ...current, modelId: models.data?.items[0]?.id || "" }); setOpen(true); }}>Novo veiculo</Button>}
      />
      <Table
        headers={["Veiculo", "Ano", "Preco", "Acoes"]}
        rows={(query.data?.items || []).map((vehicle) => [
          `${vehicle.model.name} ${vehicle.trim}`,
          String(vehicle.year),
          vehicle.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
          <div className="flex gap-2" key={vehicle.id}>
            <Button variant="secondary" onClick={() => { setEditing({ ...vehicle, modelId: vehicle.model.id }); setOpen(true); }}>Editar</Button>
            <Button variant="ghost" onClick={() => setDeletingId(vehicle.id)}>Excluir</Button>
          </div>
        ])}
      />
      <Modal open={open} onClose={() => setOpen(false)} title={current.id ? "Editar veiculo" : "Novo veiculo"}>
        <div className="grid gap-3 md:grid-cols-2">
          <Select value={current.modelId} onChange={(e) => setEditing({ ...current, modelId: e.target.value })}>
            <option value="">Selecione o modelo</option>
            {models.data?.items.map((model) => <option key={model.id} value={model.id}>{model.brand.name} {model.name}</option>)}
          </Select>
          <Input placeholder="Versao" value={current.trim} onChange={(e) => setEditing({ ...current, trim: e.target.value })} />
          <Input type="number" placeholder="Ano" value={current.year} onChange={(e) => setEditing({ ...current, year: Number(e.target.value) })} />
          <Input type="number" placeholder="Preco" value={current.price} onChange={(e) => setEditing({ ...current, price: Number(e.target.value) })} />
          <Input placeholder="Combustivel" value={current.fuelType} onChange={(e) => setEditing({ ...current, fuelType: e.target.value })} />
          <Input placeholder="Transmissao" value={current.transmission} onChange={(e) => setEditing({ ...current, transmission: e.target.value })} />
          <Input placeholder="Carroceria" value={current.bodyType} onChange={(e) => setEditing({ ...current, bodyType: e.target.value })} />
          <Input type="number" placeholder="Potencia" value={current.horsepower} onChange={(e) => setEditing({ ...current, horsepower: Number(e.target.value) })} />
          <Input type="number" placeholder="Torque" value={current.torque} onChange={(e) => setEditing({ ...current, torque: Number(e.target.value) })} />
          <Input placeholder="Motor" value={current.engine} onChange={(e) => setEditing({ ...current, engine: e.target.value })} />
          <Input type="number" placeholder="Consumo cidade" value={current.consumptionCity} onChange={(e) => setEditing({ ...current, consumptionCity: Number(e.target.value) })} />
          <Input type="number" placeholder="Consumo rodovia" value={current.consumptionHighway} onChange={(e) => setEditing({ ...current, consumptionHighway: Number(e.target.value) })} />
          <Input type="number" placeholder="Portas" value={current.doors} onChange={(e) => setEditing({ ...current, doors: Number(e.target.value) })} />
          <Input type="number" placeholder="Porta-malas" value={current.trunkCapacity} onChange={(e) => setEditing({ ...current, trunkCapacity: Number(e.target.value) })} />
          <Input placeholder="Cor" value={current.color} onChange={(e) => setEditing({ ...current, color: e.target.value })} />
          <Input placeholder="Imagem URL" value={current.imageUrl} onChange={(e) => setEditing({ ...current, imageUrl: e.target.value })} />
        </div>
        <div className="mt-3">
          <Input placeholder="Descricao" value={current.description} onChange={(e) => setEditing({ ...current, description: e.target.value })} />
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={async () => {
            if (!editing) return;
            const payload = { ...editing };
            delete payload.id;
            delete payload.model;
            if (editing.id) await updateVehicle(editing.id, payload);
            else await createVehicle(payload);
            await query.refetch();
            push("Veiculo salvo com sucesso.");
            setOpen(false);
          }}>Salvar</Button>
        </div>
      </Modal>
      <ConfirmDialog
        open={Boolean(deletingId)}
        title="Excluir veiculo"
        description="A exclusao remove a versao do catalogo e de comparacoes futuras."
        onCancel={() => setDeletingId(null)}
        onConfirm={async () => {
          if (!deletingId) return;
          await deleteVehicle(deletingId);
          await query.refetch();
          push("Veiculo removido.");
          setDeletingId(null);
        }}
      />
    </div>
  );
}
