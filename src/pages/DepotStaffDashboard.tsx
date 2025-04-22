import React from "react";

const DepotStaffDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">
        Depot Staff Dashboard
      </h1>
      <p className="text-gray-600">
        Welcome to the Depot Staff Dashboard. Manage inventory, trucks, and
        deliveries from here.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Inventory Status</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Diesel</span>
              <span className="font-medium">15,240 L</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Unleaded</span>
              <span className="font-medium">8,750 L</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Premium</span>
              <span className="font-medium">5,120 L</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Today's Deliveries</h2>
          <div className="space-y-3">
            <div className="border-l-4 border-green-500 pl-3">
              <p className="font-medium">Truck #102 - 3 Deliveries</p>
              <p className="text-sm text-gray-500">Departed at 8:30 AM</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-3">
              <p className="font-medium">Truck #105 - 5 Deliveries</p>
              <p className="text-sm text-gray-500">Departing at 11:00 AM</p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-3">
              <p className="font-medium">Truck #108 - 4 Deliveries</p>
              <p className="text-sm text-gray-500">Departing at 2:00 PM</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
              Schedule Truck
            </button>
            <button className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
              Update Inventory
            </button>
            <button className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
              Log Maintenance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepotStaffDashboard;
