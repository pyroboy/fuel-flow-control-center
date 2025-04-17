import React from "react";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import OfficeStaffDashboard from "@/components/dashboard/OfficeStaffDashboard";
import DepotStaffDashboard from "@/components/dashboard/DepotStaffDashboard";
import { UserRole } from "@/types";

// Mock user context for demonstration
// In a real application, this would come from authentication context
const useAuthContext = () => ({
  currentUser: {
    id: "usr_3",
    role: UserRole.DepotStaff, // Change this to test different dashboards
    name: "Charlie Chaplin",
  },
});

const Dashboard: React.FC = () => {
  // Replace this with your actual auth context later
  const { currentUser } = useAuthContext();
  const userRole = currentUser?.role || UserRole.Admin; // Default or handle null

  if (userRole === UserRole.Admin) {
    return <AdminDashboard />;
  }

  if (userRole === UserRole.OfficeStaff) {
    return <OfficeStaffDashboard />;
  }

  if (userRole === UserRole.DepotStaff) {
    return <DepotStaffDashboard />;
  }

  // Add placeholders for other roles here...

  // Fallback/Default Dashboard (or redirect/error)
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
      <p className="text-gray-600">
        Welcome to the Fuel Flow Control Center. This dashboard is customized
        for your role.
      </p>
      <div className="p-8 text-center bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-700">
          Role-specific dashboard for {userRole} (Not Implemented)
        </h2>
        <p className="mt-2 text-gray-500">
          This dashboard would display information and actions relevant to your
          role.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
