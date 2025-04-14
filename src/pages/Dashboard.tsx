
import React from 'react';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import { UserRole } from '@/types';

// Mock user role for demonstration
// In a real application, this would come from authentication
const userRole = UserRole.Admin;

const Dashboard: React.FC = () => {
  // In a real application, we would render different dashboards based on user role
  if (userRole === UserRole.Admin) {
    return <AdminDashboard />;
  }
  
  // For now, we'll just display a placeholder for other roles
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
      <p className="text-gray-600">
        Welcome to the Fuel Flow Control Center. This dashboard is customized for your role.
      </p>
      <div className="p-8 text-center bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-700">Role-specific dashboard for {userRole}</h2>
        <p className="mt-2 text-gray-500">
          This dashboard would display information and actions relevant to your role as {userRole}.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
