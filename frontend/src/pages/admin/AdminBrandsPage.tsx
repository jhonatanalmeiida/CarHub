import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { createBrand, deleteBrand, fetchBrands, updateBrand } from "../../services/catalog";
import { Button, ConfirmDialog, Input, Modal, PageHeader, Table } from "../../components/ui";
import { useToast } from "../../contexts/ToastContext";

export function AdminBrandsPage() {
  const query = useQuery({ queryKey: ["brands-admin-list"], queryFn: () => fetchBrands({ page: 1, limit: 20 }) });
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<{ id?: string; name: string; country: string; logoUrl: string } | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { push } = useToast();

  const current = editing || { name: "", country: "", logoUrl: "" };

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Admin"
        title="CRUD de marcas"
        description="Tabela produtiva com base para busca, edicao e remocao segura."
        actions={<Button onClick={() => { setEditing({ name: "", country: "", logoUrl: "" }); setOpen(true); }}>Nova marca</Button>}
      />
      <Table
        headers={["Nome", "Pais", "Acoes"]}
        rows={(query.data?.items || []).map((brand) => [
          brand.name,
          brand.country || "N/A",
          <div className="flex gap-2" key={brand.id}>
            <Button variant="secondary" onClick={() => { setEditing({ id: brand.id, name: brand.name, country: brand.country || "", logoUrl: brand.logoUrl || "" }); setOpen(true); }}>Editar</Button>
            <Button variant="ghost" onClick={() => setDeletingId(brand.id)}>Excluir</Button>
          </div>
        ])}
      />
      <Modal open={open} onClose={() => setOpen(false)} title={current.id ? "Editar marca" : "Nova marca"}>
        <div className="space-y-3">
          <Input placeholder="Nome" value={current.name} onChange={(e) => setEditing({ ...current, name: e.target.value })} />
          <Input placeholder="Pais" value={current.country} onChange={(e) => setEditing({ ...current, country: e.target.value })} />
          <Input placeholder="Logo URL" value={current.logoUrl} onChange={(e) => setEditing({ ...current, logoUrl: e.target.value })} />
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={async () => {
            if (!editing) return;
            if (editing.id) await updateBrand(editing.id, editing);
            else await createBrand(editing);
            await query.refetch();
            push("Marca salva com sucesso.");
            setOpen(false);
          }}>Salvar</Button>
        </div>
      </Modal>
      <ConfirmDialog
        open={Boolean(deletingId)}
        title="Excluir marca"
        description="Esta acao remove a marca do catalogo. Use com cuidado."
        onCancel={() => setDeletingId(null)}
        onConfirm={async () => {
          if (!deletingId) return;
          await deleteBrand(deletingId);
          await query.refetch();
          push("Marca removida.");
          setDeletingId(null);
        }}
      />
    </div>
  );
}
