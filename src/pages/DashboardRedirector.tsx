import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";
import { UserRole } from "@/types";

// This returns a relative path within the /app prefix
// Navigation will be relative to the current route (which is already /app)
const getDashboardPathForRole = (role: UserRole | null): string => {
  switch (role) {
    case UserRole.Admin:
      return "admin-dashboard";
    case UserRole.OfficeStaff:
      return "office-staff-dashboard";
    case UserRole.DepotStaff:
      return "depot-staff-dashboard";
    case UserRole.GSO:
      return "gso-dashboard";
    case UserRole.GSOStaff:
      return "gso-staff-dashboard";
    default:
      return "admin-dashboard"; // Fallback
  }
};

const DashboardRedirector: React.FC = () => {
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const dashboardPath = getDashboardPathForRole(currentUser?.role);
    navigate(dashboardPath, { replace: true });
  }, [currentUser, navigate]);

  return <div>Redirecting to your dashboard...</div>;
};

export default DashboardRedirector;
