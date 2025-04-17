import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { toast } from "sonner";

// Define the inventory item interface
interface MockInventoryItem {
  fuelTypeId: string;
  fuelTypeName: string;
  currentLevel: number;
  unit: string; // e.g., 'Liters'
  capacity?: number; // Optional: Max capacity
  lastUpdated: string;
}

const Inventory: React.FC = () => {
  // Mock inventory data
  const initialMockInventory: MockInventoryItem[] = [
    {
      fuelTypeId: "ft_1",
      fuelTypeName: "Diesel",
      currentLevel: 85000,
      unit: "Liters",
      capacity: 100000,
      lastUpdated: "2025-04-14T11:00:00Z",
    },
    {
      fuelTypeId: "ft_2",
      fuelTypeName: "Gasoline 95 RON",
      currentLevel: 42000,
      unit: "Liters",
      capacity: 50000,
      lastUpdated: "2025-04-13T16:30:00Z",
    },
    {
      fuelTypeId: "ft_4",
      fuelTypeName: "Premium Gasoline 97 RON",
      currentLevel: 15000,
      unit: "Liters",
      capacity: 20000,
      lastUpdated: "2025-04-14T09:15:00Z",
    },
    {
      fuelTypeId: "ft_3",
      fuelTypeName: "Kerosene",
      currentLevel: 0,
      unit: "Liters",
      capacity: 10000,
      lastUpdated: "2025-02-10T00:00:00Z",
    }, // Example for unavailable fuel
  ];

  const [inventory, setInventory] =
    useState<MockInventoryItem[]>(initialMockInventory);

  // Mock button action handlers
  const handleRecordAdjustment = () => {
    alert("Record Adjustment modal/form not implemented yet.");
    // Alternatively, use toast
    // toast.info('Record Adjustment modal/form not implemented yet.');
  };

  const handleRecordReplenishment = () => {
    alert("Record Replenishment modal/form not implemented yet.");
    // Alternatively, use toast
    // toast.info('Record Replenishment modal/form not implemented yet.');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Inventory Hub</h1>
          <p className="text-gray-600 mt-1">Track and manage fuel inventory</p>
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            className="border-indigo-900 text-indigo-900 hover:bg-indigo-50"
            onClick={handleRecordAdjustment}
          >
            <RefreshCw className="mr-2 h-4 w-4" /> Record Adjustment
          </Button>
          <Button
            className="bg-indigo-900 hover:bg-indigo-800"
            onClick={handleRecordReplenishment}
          >
            <TrendingUp className="mr-2 h-4 w-4" /> Record Replenishment
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inventory Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {inventory.map((item) => (
              <Card key={item.fuelTypeId}>
                <CardHeader>
                  <CardTitle>{item.fuelTypeName}</CardTitle>
                  <CardDescription>ID: {item.fuelTypeId}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium">
                        Current Level: {item.currentLevel.toLocaleString()}{" "}
                        {item.unit}
                        {item.capacity &&
                          ` / ${item.capacity.toLocaleString()} ${item.unit}`}
                      </p>
                      {item.capacity && (
                        <Progress
                          value={(item.currentLevel / item.capacity) * 100}
                          className="h-2 w-[90%] mx-auto mt-2"
                        />
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
                      Last Updated:{" "}
                      {new Date(item.lastUpdated).toLocaleString()}
                    </div>
                    <div
                      className={`text-sm ${
                        item.currentLevel === 0
                          ? "text-red-500 font-medium"
                          : item.capacity &&
                            item.currentLevel < item.capacity * 0.2
                          ? "text-amber-500 font-medium"
                          : ""
                      }`}
                    >
                      {item.currentLevel === 0
                        ? "Out of Stock"
                        : item.capacity &&
                          item.currentLevel < item.capacity * 0.2
                        ? "Low Stock"
                        : ""}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Inventory;
