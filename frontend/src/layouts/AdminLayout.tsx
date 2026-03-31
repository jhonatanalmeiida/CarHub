import { CarFront, LayoutDashboard, Tags, Waypoints } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

export function AdminLayout() {
  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-2xl px-4 py-3 transition ${
      isActive ? "bg-accent text-white" : "text-muted hover:bg-[rgb(var(--surface-soft))] hover:text-[rgb(var(--text))]"
    }`;

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
      <aside className="surface rounded-3xl border border-app p-5">
        <p className="text-xs uppercase tracking-[0.35em] text-accent">Admin Panel</p>
        <nav className="mt-6 space-y-2">
          <NavLink className={navItemClass} to="/admin" end>
            <LayoutDashboard className="h-4 w-4" /> Dashboard
          </NavLink>
          <NavLink className={navItemClass} to="/admin/marcas">
            <Tags className="h-4 w-4" /> Marcas
          </NavLink>
          <NavLink className={navItemClass} to="/admin/modelos">
            <Waypoints className="h-4 w-4" /> Modelos
          </NavLink>
          <NavLink className={navItemClass} to="/admin/veiculos">
            <CarFront className="h-4 w-4" /> Veiculos
          </NavLink>
        </nav>
      </aside>
      <section>
        <Outlet />
      </section>
    </div>
  );
}
