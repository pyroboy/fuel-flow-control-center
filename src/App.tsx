import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Users from "./pages/Users";
import FuelSettings from "./pages/FuelSettings";
import TruckRecords from "./pages/TruckRecords";
import Orders from "./pages/Orders";
import Inventory from "./pages/Inventory";
import Reports from "./pages/Reports";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardRedirector from "./pages/DashboardRedirector";
import AdminDashboard from "./pages/AdminDashboard";
import OfficeStaffDashboard from "./pages/OfficeStaffDashboard";
import DepotStaffDashboard from "./pages/DepotStaffDashboard";
import GSODashboard from "./pages/GSODashboard";
import GSOStaffDashboard from "./pages/GSOStaffDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />

          {/* Protected routes (now prefixed with /app) */}
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            {/* Role-specific Dashboard Routes */}
            <Route path="admin-dashboard" element={<AdminDashboard />} />
            <Route
              path="office-staff-dashboard"
              element={<OfficeStaffDashboard />}
            />
            <Route
              path="depot-staff-dashboard"
              element={<DepotStaffDashboard />}
            />
            <Route path="gso-dashboard" element={<GSODashboard />} />
            <Route path="gso-staff-dashboard" element={<GSOStaffDashboard />} />

            {/* Redirector for '/app' index path AFTER login */}
            <Route index element={<DashboardRedirector />} />

            {/* Other feature routes (paths are relative to /app) */}
            <Route path="users" element={<Users />} />
            <Route path="fuel-settings" element={<FuelSettings />} />
            <Route path="trucks" element={<TruckRecords />} />
            <Route path="orders" element={<Orders />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="reports" element={<Reports />} />
            <Route path="messages" element={<Messages />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Fallback 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
