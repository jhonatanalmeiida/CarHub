import { CarFront, Heart, LayoutDashboard, LogOut, Scale } from "lucide-react";
import { Link, NavLink, Outlet } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";
import { Button, ThemeToggle } from "../components/ui";

export function MainLayout() {
  const { user, logout } = useAuth();
  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-full px-3 py-2 text-sm transition ${
      isActive ? "bg-accent text-white" : "text-muted hover:bg-[rgb(var(--surface-soft))] hover:text-[rgb(var(--text))]"
    }`;

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-app bg-[rgb(var(--bg))/0.9] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-3 font-display text-xl">
            <span className="rounded-2xl bg-accent/20 p-2 text-accent">
              <CarFront className="h-5 w-5" />
            </span>
            CarHub Cloud
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <NavLink to="/catalogo" className={navItemClass}>Catalogo</NavLink>
            <NavLink to="/favoritos" className={navItemClass}>Favoritos</NavLink>
            <NavLink to="/comparacao" className={navItemClass}>Comparacao</NavLink>
            {user?.role === "ADMIN" ? <NavLink to="/admin" className={navItemClass}>Admin</NavLink> : null}
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            {user ? (
              <>
                <Link to="/perfil" className="hidden rounded-full border border-app px-4 py-2 text-sm md:block">
                  {user.name}
                </Link>
                <Button variant="ghost" onClick={logout}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm text-muted transition hover:text-[rgb(var(--text))]">Entrar</Link>
                <Link to="/cadastro">
                  <Button>Criar conta</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-10">
        <Outlet />
      </main>
      <footer className="border-t border-app px-4 py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-muted md:flex-row md:justify-between">
          <p>CarHub Cloud. Catalogo automotivo inteligente pronto para nuvem.</p>
          <div className="flex gap-4">
            <Link to="/catalogo" className="inline-flex items-center gap-2"><CarFront className="h-4 w-4" /> Catalogo</Link>
            <Link to="/favoritos" className="inline-flex items-center gap-2"><Heart className="h-4 w-4" /> Favoritos</Link>
            <Link to="/comparacao" className="inline-flex items-center gap-2"><Scale className="h-4 w-4" /> Comparacao</Link>
            <Link to="/admin" className="inline-flex items-center gap-2"><LayoutDashboard className="h-4 w-4" /> Admin</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
