import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { createModel, deleteModel, fetchBrands, fetchModels, updateModel } from "../../services/catalog";
import { Button, ConfirmDialog, Input, Modal, PageHeader, Select, Table } from "../../components/ui";
import { useToast } from "../../contexts/ToastContext";

export function AdminModelsPage() {
  const query = useQuery({ queryKey: ["models-admin-list"], queryFn: () => fetchModels({ page: 1, limit: 20 }) });
  const brands = useQuery({ queryKey: ["admin-model-brands"], queryFn: () => fetchBrands({ page: 1, limit: 50 }) });
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<{ id?: string; name: string; brandId: string; category: string; yearStart: number; yearEnd?: number | null } | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { push } = useToast();
  const current = editing || { name: "", brandId: "", category: "", yearStart: 2020, yearEnd: null };

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Admin"
        title="CRUD de modelos"
        description="Gerencie relacoes entre marcas, categorias e intervalos de producao."
        actions={<Button onClick={() => { setEditing({ name: "", brandId: brands.data?.items[0]?.id || "", category: "", yearStart: 2020, yearEnd: null }); setOpen(true); }}>Novo modelo</Button>}
      />
      <Table
        headers={["Modelo", "Marca", "Categoria", "Acoes"]}
        rows={(query.data?.items || []).map((model) => [
          model.name,
          model.brand.name,
          model.category,
          <div className="flex gap-2" key={model.id}>
            <Button variant="secondary" onClick={() => { setEditing({ id: model.id, name: model.name, brandId: model.brandId, category: model.category, yearStart: model.yearStart, yearEnd: model.yearEnd }); setOpen(true); }}>Editar</Button>
            <Button variant="ghost" onClick={() => setDeletingId(model.id)}>Excluir</Button>
          </div>
        ])}
      />
      <Modal open={open} onClose={() => setOpen(false)} title={current.id ? "Editar modelo" : "Novo modelo"}>
        <div className="space-y-3">
          <Input placeholder="Nome" value={current.name} onChange={(e) => setEditing({ ...current, name: e.target.value })} />
          <Select value={current.brandId} onChange={(e) => setEditing({ ...current, brandId: e.target.value })}>
            <option value="">Selecione a marca</option>
            {brands.data?.items.map((brand) => <option key={brand.id} value={brand.id}>{brand.name}</option>)}
          </Select>
          <Input placeholder="Categoria" value={current.category} onChange={(e) => setEditing({ ...current, category: e.target.value })} />
          <Input type="number" placeholder="Ano inicial" value={current.yearStart} onChange={(e) => setEditing({ ...current, yearStart: Number(e.target.value) })} />
          <Input type="number" placeholder="Ano final" value={current.yearEnd || ""} onChange={(e) => setEditing({ ...current, yearEnd: e.target.value ? Number(e.target.value) : null })} />
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={async () => {
            if (!editing) return;
            if (editing.id) await updateModel(editing.id, editing);
            else await createModel(editing);
            await query.refetch();
            push("Modelo salvo com sucesso.");
            setOpen(false);
          }}>Salvar</Button>
        </div>
      </Modal>
      <ConfirmDialog
        open={Boolean(deletingId)}
        title="Excluir modelo"
        description="O modelo sera removido do catalogo administrativo."
        onCancel={() => setDeletingId(null)}
        onConfirm={async () => {
          if (!deletingId) return;
          await deleteModel(deletingId);
          await query.refetch();
          push("Modelo removido.");
          setDeletingId(null);
        }}
      />
    </div>
  );
}
