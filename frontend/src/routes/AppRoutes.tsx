import { ReactElement } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { MainLayout } from "../layouts/MainLayout";
import { AuthLayout } from "../layouts/AuthLayout";
import { AdminLayout } from "../layouts/AdminLayout";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { CatalogPage } from "../pages/CatalogPage";
import { VehicleDetailPage } from "../pages/VehicleDetailPage";
import { FavoritesPage } from "../pages/FavoritesPage";
import { ComparisonPage } from "../pages/ComparisonPage";
import { ProfilePage } from "../pages/ProfilePage";
import { AdminDashboardPage } from "../pages/admin/AdminDashboardPage";
import { AdminBrandsPage } from "../pages/admin/AdminBrandsPage";
import { AdminModelsPage } from "../pages/admin/AdminModelsPage";
import { AdminVehiclesPage } from "../pages/admin/AdminVehiclesPage";
import { useAuth } from "../contexts/AuthContext";

function ProtectedRoute({ children, adminOnly = false }: { children: ReactElement; adminOnly?: boolean }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (adminOnly && user.role !== "ADMIN") return <Navigate to="/" replace />;
  return children;
}

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalogo" element={<CatalogPage />} />
        <Route path="/catalogo/:id" element={<VehicleDetailPage />} />
        <Route path="/favoritos" element={<ProtectedRoute><FavoritesPage /></ProtectedRoute>} />
        <Route path="/comparacao" element={<ComparisonPage />} />
        <Route path="/perfil" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute adminOnly><AdminLayout /></ProtectedRoute>}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="marcas" element={<AdminBrandsPage />} />
          <Route path="modelos" element={<AdminModelsPage />} />
          <Route path="veiculos" element={<AdminVehiclesPage />} />
        </Route>
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}
