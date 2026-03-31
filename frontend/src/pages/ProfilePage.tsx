import { useAuth } from "../contexts/AuthContext";
import { Card, PageHeader } from "../components/ui";

export function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Perfil"
        title={user?.name || "Minha conta"}
        description="Resumo da sua identidade, permissao e acesso na plataforma."
      />
      <Card className="grid gap-4 md:grid-cols-3">
        <div>
          <p className="text-sm text-muted">Nome</p>
          <p className="mt-2 text-xl font-semibold">{user?.name}</p>
        </div>
        <div>
          <p className="text-sm text-muted">Email</p>
          <p className="mt-2 text-xl font-semibold">{user?.email}</p>
        </div>
        <div>
          <p className="text-sm text-muted">Perfil</p>
          <p className="mt-2 text-xl font-semibold">{user?.role}</p>
        </div>
      </Card>
    </div>
  );
}

