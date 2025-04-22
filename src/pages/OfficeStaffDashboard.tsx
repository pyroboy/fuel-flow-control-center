import React from "react";

const OfficeStaffDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">
        Office Staff Dashboard
      </h1>
      <p className="text-gray-600">
        Welcome to the Office Staff Dashboard. Manage customer orders and fuel
        pricing from here.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">New Orders</span>
              <span className="font-medium">7</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Pending Confirmation</span>
              <span className="font-medium">4</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Scheduled For Today</span>
              <span className="font-medium">12</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Customer Inquiries</h2>
          <div className="space-y-3">
            <div className="border-l-4 border-green-500 pl-3">
              <p className="font-medium">ABC Station - Delivery ETA</p>
              <p className="text-sm text-gray-500">15 minutes ago</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-3">
              <p className="font-medium">XYZ Station - Invoice Query</p>
              <p className="text-sm text-gray-500">1 hour ago</p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-3">
              <p className="font-medium">New Price Schedule Request</p>
              <p className="text-sm text-gray-500">3 hours ago</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
              Process New Order
            </button>
            <button className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
              Update Fuel Prices
            </button>
            <button className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
              Generate Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficeStaffDashboard;
