import React, { useState } from "react";
import PendingGSOTable from "@/components/dashboard/PendingGSOTable";
import { Profile, RegistrationStatus } from "@/types";
import { toast } from "sonner";

const initialMockPendingGSOs = [
  {
    id: "1",
    name: "Eastside Fuels",
    owner: "John Rodriguez",
    location: "Metro East, Zone 4",
    submittedDate: "2025-04-10",
    status: RegistrationStatus.Pending,
  },
  {
    id: "2",
    name: "North Star Gas",
    owner: "Maria Chen",
    location: "Northern District, Area 2",
    submittedDate: "2025-04-11",
    status: RegistrationStatus.Pending,
  },
  {
    id: "3",
    name: "Valley Petroleum",
    owner: "Robert Nelson",
    location: "Southern Valley, Block 7",
    submittedDate: "2025-04-13",
    status: RegistrationStatus.Pending,
  },
];

const AdminDashboard: React.FC = () => {
  const [mockPendingGSOs, setMockPendingGSOs] = useState(
    initialMockPendingGSOs
  );

  const handleApproveGSO = (userId: string) => {
    setMockPendingGSOs((prev) =>
      prev.map((gso) =>
        gso.id === userId
          ? { ...gso, status: RegistrationStatus.Approved }
          : gso
      )
    );
    toast.success("GSO approved!");
    console.log("Approved GSO:", userId);
  };

  const handleRejectGSO = (userId: string) => {
    setMockPendingGSOs((prev) => prev.filter((gso) => gso.id !== userId));
    toast("GSO rejected.");
    console.log("Rejected GSO:", userId);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
      <p className="text-gray-600">
        Welcome to the Fuel Flow Control Center Admin Dashboard.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">System Overview</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Active Users</span>
              <span className="font-medium">24</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Pending Orders</span>
              <span className="font-medium">12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Deliveries (Today)</span>
              <span className="font-medium">8</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="border-l-4 border-green-500 pl-3">
              <p className="font-medium">New order placed</p>
              <p className="text-sm text-gray-500">10 minutes ago</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-3">
              <p className="font-medium">Truck #103 dispatched</p>
              <p className="text-sm text-gray-500">25 minutes ago</p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-3">
              <p className="font-medium">Price update scheduled</p>
              <p className="text-sm text-gray-500">1 hour ago</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
              Add New User
            </button>
            <button className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
              Update Fuel Prices
            </button>
            <button className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
              Generate Monthly Report
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">
          Pending GSO Registrations
        </h2>
        <PendingGSOTable
          pendingGSOs={mockPendingGSOs}
          onApproveGSO={handleApproveGSO}
          onRejectGSO={handleRejectGSO}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
