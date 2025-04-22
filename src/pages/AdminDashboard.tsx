import React from "react";

const AdminDashboard: React.FC = () => {
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
    </div>
  );
};

export default AdminDashboard;
