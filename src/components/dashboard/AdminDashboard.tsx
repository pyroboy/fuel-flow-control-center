import React from "react";
import {
  ShoppingCart,
  Users,
  TrendingUp,
  Truck,
  AlertTriangle,
  Bell,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderStatus } from "@/types";
import PendingGSOTable from "./PendingGSOTable";

const AdminDashboard: React.FC = () => {
  // Mock data for demonstration
  const stats = {
    pendingOrders: 12,
    activeUsers: 48,
    pendingGSOs: 3,
    activeTrucks: 8,
    systemAlerts: 2,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome back to the Fuel Flow Control Center
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Pending Orders
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingOrders}</div>
            <p className="text-xs text-gray-500 mt-1">Requiring attention</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeUsers}</div>
            <p className="text-xs text-gray-500 mt-1">Across all roles</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Pending GSOs</CardTitle>
            <TrendingUp className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingGSOs}</div>
            <p className="text-xs text-gray-500 mt-1">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Active Trucks</CardTitle>
            <Truck className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeTrucks}</div>
            <p className="text-xs text-gray-500 mt-1">Ready for delivery</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending GSO Registrations */}
        <Card className="lg:col-span-2 hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Pending GSO Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <PendingGSOTable />
          </CardContent>
        </Card>

        {/* System Alerts */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center space-y-0">
            <CardTitle>System Alerts</CardTitle>
            <Bell className="h-4 w-4 text-indigo-600 ml-2" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-amber-50 border border-amber-200 rounded-md">
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-800">
                    Low Inventory Alert
                  </h4>
                  <p className="text-sm text-amber-700">
                    Diesel fuel inventory below 20% threshold
                  </p>
                  <p className="text-xs text-amber-600 mt-1 flex items-center">
                    <Clock className="h-3 w-3 mr-1" /> 2 hours ago
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-red-50 border border-red-200 rounded-md">
                <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-red-800">Delivery Delay</h4>
                  <p className="text-sm text-red-700">
                    Truck T-103 running behind schedule
                  </p>
                  <p className="text-xs text-red-600 mt-1 flex items-center">
                    <Clock className="h-3 w-3 mr-1" /> 45 minutes ago
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
