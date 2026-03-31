import { motion } from "framer-motion";
import { Search, SunMoon, X } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { cn } from "../utils/cn";

export function Button({
  className,
  variant = "primary",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" }) {
  const variants = {
    primary: "bg-accent text-white shadow-soft hover:bg-accent-muted",
    secondary: "surface border border-app text-[rgb(var(--text))] hover:bg-[rgb(var(--surface-soft))]",
    ghost: "bg-transparent text-[rgb(var(--text))] hover:bg-[rgb(var(--surface-soft))]"
  };
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="w-full rounded-2xl border border-app surface-soft px-4 py-3 text-sm text-[rgb(var(--text))] outline-none transition placeholder:text-muted focus:border-accent"
      {...props}
    />
  );
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className="w-full rounded-2xl border border-app surface-soft px-4 py-3 text-sm text-[rgb(var(--text))] outline-none transition focus:border-accent"
      {...props}
    />
  );
}

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("rounded-full border border-app px-3 py-1 text-xs font-semibold text-muted", className)}>
      {children}
    </span>
  );
}

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("surface rounded-3xl border border-app p-6 shadow-soft", className)}>{children}</div>;
}

export function Modal({
  open,
  onClose,
  title,
  children
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center soft-overlay p-4">
      <div className="surface theme-shadow w-full max-w-lg rounded-3xl border border-app p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-xl">{title}</h3>
          <button onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function Drawer({
  open,
  title,
  onClose,
  children
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={false}
      animate={{ x: open ? 0 : "100%" }}
      className="fixed right-0 top-0 z-40 h-full w-full max-w-sm surface theme-shadow border-l border-app p-6"
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-xl">{title}</h3>
        <button onClick={onClose}>
          <X className="h-5 w-5" />
        </button>
      </div>
      {children}
    </motion.div>
  );
}

export function Tabs({
  items,
  value,
  onChange
}: {
  items: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="inline-flex rounded-2xl border border-app p-1">
      {items.map((item) => (
        <button
          key={item}
          onClick={() => onChange(item)}
          className={cn(
            "rounded-2xl px-4 py-2 text-sm transition",
            value === item ? "bg-accent text-white" : "text-muted"
          )}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export function Table({
  headers,
  rows
}: {
  headers: string[];
  rows: React.ReactNode[][];
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-app">
      <table className="w-full border-collapse">
        <thead className="surface-elevated text-left text-xs uppercase tracking-[0.3em] text-muted">
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-4 py-3">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="border-t border-app">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-4 py-4 text-sm">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("surface-soft animate-pulse rounded-2xl", className)} />;
}

export function EmptyState({
  title,
  description,
  action
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <Card className="text-center">
      <h3 className="font-display text-2xl">{title}</h3>
      <p className="mt-2 text-sm text-muted">{description}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </Card>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-accent">{eyebrow}</p>
        <h1 className="mt-3 font-display text-4xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-sm text-muted">{description}</p>
      </div>
      {actions}
    </div>
  );
}

export function FilterChip({
  label,
  onRemove
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <button onClick={onRemove} className="surface-soft inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm">
      {label}
      <X className="h-4 w-4" />
    </button>
  );
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Busque por marca, modelo ou versao"
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="surface-soft flex items-center gap-3 rounded-2xl border border-app px-4 py-3">
      <Search className="h-4 w-4 text-accent" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full bg-transparent text-[rgb(var(--text))] outline-none placeholder:text-muted"
        placeholder={placeholder}
      />
    </label>
  );
}

export function Pagination({
  page,
  total,
  limit,
  onPageChange
}: {
  page: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
}) {
  const pages = Math.max(1, Math.ceil(total / limit));
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted">Pagina {page} de {pages}</span>
      <div className="flex gap-2">
        <Button variant="secondary" disabled={page === 1} onClick={() => onPageChange(page - 1)}>Anterior</Button>
        <Button variant="secondary" disabled={page >= pages} onClick={() => onPageChange(page + 1)}>Proxima</Button>
      </div>
    </div>
  );
}

export function ConfirmDialog({
  open,
  title,
  description,
  onCancel,
  onConfirm
}: {
  open: boolean;
  title: string;
  description: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <Modal open={open} onClose={onCancel} title={title}>
      <p className="text-sm text-muted">{description}</p>
      <div className="mt-6 flex justify-end gap-3">
        <Button variant="ghost" onClick={onCancel}>Cancelar</Button>
        <Button onClick={onConfirm}>Confirmar</Button>
      </div>
    </Modal>
  );
}

export function StatCard({
  label,
  value,
  note
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <Card>
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-4 font-display text-3xl">{value}</p>
      <p className="mt-2 text-xs text-muted">{note}</p>
    </Card>
  );
}

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      title={`Alternar para modo ${theme === "dark" ? "claro" : "escuro"}`}
      className="rounded-full border border-app p-3 text-muted transition hover:bg-[rgb(var(--surface-soft))] hover:text-[rgb(var(--text))]"
    >
      <SunMoon className="h-5 w-5" />
    </button>
  );
}
