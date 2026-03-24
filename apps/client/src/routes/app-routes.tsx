import { Route, Routes } from "react-router-dom";
import { AdminRoute, ProtectedRoute } from "../components/guards";
import { AdminDashboardPage } from "../pages/admin-dashboard-page";
import {
  CharitiesPage,
  CharityProfilePage,
  HomePage,
  LoginPage,
  PricingPage,
  SignupPage,
} from "../pages/public-pages";
import { UserDashboardPage } from "../pages/user-dashboard-page";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/charities" element={<CharitiesPage />} />
      <Route path="/charities/:slug" element={<CharityProfilePage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <UserDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminRoute>
              <AdminDashboardPage />
            </AdminRoute>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
