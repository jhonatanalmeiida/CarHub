import { createContext, useContext, useMemo, useState } from "react";

const ComparisonContext = createContext<{
  selectedIds: string[];
  toggle: (id: string) => void;
  clear: () => void;
} | null>(null);

export function ComparisonProvider({ children }: { children: React.ReactNode }) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const value = useMemo(
    () => ({
      selectedIds,
      toggle(id: string) {
        setSelectedIds((current) => {
          if (current.includes(id)) return current.filter((item) => item !== id);
          if (current.length >= 3) return current;
          return [...current, id];
        });
      },
      clear() {
        setSelectedIds([]);
      }
    }),
    [selectedIds]
  );

  return <ComparisonContext.Provider value={value}>{children}</ComparisonContext.Provider>;
}

export function useComparison() {
  const context = useContext(ComparisonContext);
  if (!context) throw new Error("useComparison must be used within ComparisonProvider");
  return context;
}

