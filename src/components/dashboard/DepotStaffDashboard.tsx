import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  ClipboardList,
  Truck,
  Database,
  Wrench,
  CalendarPlus,
  AlertTriangle,
  RefreshCw,
  TrendingUp,
} from "lucide-react";
import {
  Order,
  OrderStatus,
  OrderType,
  TruckStatus,
  UserRole,
  OrderItem,
  PaymentMethod,
  PaymentStatus,
} from "@/types";

// Mock data from Orders.tsx
const mockUserMap: Record<string, { name: string; role: UserRole }> = {
  usr_1: { name: "Alice Wonderland", role: UserRole.Admin },
  usr_2: { name: "Bob The Builder", role: UserRole.OfficeStaff },
  usr_3: { name: "Charlie Chaplin", role: UserRole.DepotStaff },
  usr_4: { name: "Diana Prince", role: UserRole.GSO },
  usr_5: { name: "Ethan Hunt", role: UserRole.GSOStaff },
  usr_6: { name: "Fiona Shrek", role: UserRole.GSO },
};

const mockGasStationMap: Record<string, { name: string; ownerId?: string }> = {
  gso_sta_1: { name: "Prince Fuels Station 1", ownerId: "usr_4" },
  gso_sta_2: { name: "Shrek Gas & Go", ownerId: "usr_6" },
  gso_sta_3: { name: "Eastside Fuels (Rodriguez)" },
  gso_sta_4: { name: "North Star Gas (Chen)" },
  gso_sta_5: { name: "Valley Petroleum (Nelson)" },
};

const mockFuelTypeMap: Record<string, { name: string }> = {
  ft_1: { name: "Diesel" },
  ft_2: { name: "Gasoline 95 RON" },
  ft_3: { name: "Kerosene" },
  ft_4: { name: "Premium Gasoline 97 RON" },
};

// Mock Trucks data
interface MockTruck {
  id: string;
  plate_number: string;
  driver: string;
  capacity_liters: number;
  status: TruckStatus;
  created_at: string;
  updated_at: string;
}

const initialMockTrucks: MockTruck[] = [
  {
    id: "truck_1",
    plate_number: "ABC-123",
    driver: "John Driver",
    capacity_liters: 8000,
    status: TruckStatus.Available,
    created_at: "2025-01-01T00:00:00Z",
    updated_at: "2025-04-13T12:00:00Z",
  },
  {
    id: "truck_2",
    plate_number: "XYZ-789",
    driver: "Dave Trucker",
    capacity_liters: 10000,
    status: TruckStatus.Available,
    created_at: "2025-01-01T00:00:00Z",
    updated_at: "2025-04-14T09:00:00Z",
  },
  {
    id: "truck_3",
    plate_number: "DEF-456",
    driver: "Mike Wheeler",
    capacity_liters: 12000,
    status: TruckStatus.OutForDelivery,
    created_at: "2025-01-01T00:00:00Z",
    updated_at: "2025-04-14T08:00:00Z",
  },
  {
    id: "truck_4",
    plate_number: "GHI-789",
    driver: "Sarah Connor",
    capacity_liters: 8000,
    status: TruckStatus.Unavailable,
    created_at: "2025-01-01T00:00:00Z",
    updated_at: "2025-04-13T14:00:00Z",
  },
  {
    id: "truck_5",
    plate_number: "JKL-012",
    driver: "Chris Roads",
    capacity_liters: 10000,
    status: TruckStatus.Disabled,
    created_at: "2025-01-01T00:00:00Z",
    updated_at: "2025-03-25T00:00:00Z",
  },
];

// Mock confirmed orders
const initialConfirmedOrders: Order[] = [
  {
    id: "ord_2",
    gas_station_id: "gso_sta_4",
    placed_by_user_id: "usr_5",
    order_type: OrderType.Pickup,
    status: OrderStatus.Confirmed,
    payment_method: PaymentMethod.Cheque,
    payment_status: PaymentStatus.Pending,
    confirmed_by_user_id: "usr_2",
    created_at: "2025-04-13T15:30:00Z",
    updated_at: "2025-04-14T09:15:00Z",
  },
  {
    id: "ord_12",
    gas_station_id: "gso_sta_3",
    placed_by_user_id: "usr_4",
    order_type: OrderType.Delivery,
    status: OrderStatus.Confirmed,
    payment_method: PaymentMethod.Cash,
    payment_status: PaymentStatus.Pending,
    confirmed_by_user_id: "usr_2",
    created_at: "2025-04-14T07:45:00Z",
    updated_at: "2025-04-14T09:30:00Z",
  },
  {
    id: "ord_13",
    gas_station_id: "gso_sta_5",
    placed_by_user_id: "usr_4",
    order_type: OrderType.Delivery,
    status: OrderStatus.Confirmed,
    payment_method: PaymentMethod.Cash,
    payment_status: PaymentStatus.Pending,
    confirmed_by_user_id: "usr_2",
    created_at: "2025-04-13T16:20:00Z",
    updated_at: "2025-04-14T08:45:00Z",
  },
];

// Mock active deliveries/ready pickups
const initialActiveDeliveries = [
  {
    id: "run_1",
    truck_id: "truck_3",
    order_ids: ["ord_4"],
    status: "out_for_delivery",
    destination: "gso_sta_5",
    scheduled_time: "2025-04-14T08:00:00Z",
    estimated_completion: "2025-04-14T16:00:00Z",
  },
  {
    id: "ord_6",
    truck_id: null,
    order_ids: ["ord_6"],
    status: "ready_for_pickup",
    destination: "gso_sta_1",
    scheduled_time: "2025-04-14T14:00:00Z",
    estimated_completion: "2025-04-14T15:00:00Z",
  },
];

// Mock order items
const initialMockOrderItems: OrderItem[] = [
  // Items for Order 2 (ord_2)
  {
    id: "oi_2",
    order_id: "ord_2",
    fuel_type_id: "ft_2",
    quantity_liters: 3000,
    price_per_liter_at_order: 71.25,
  },
  // Items for Order 12 (ord_12)
  {
    id: "oi_13",
    order_id: "ord_12",
    fuel_type_id: "ft_1",
    quantity_liters: 6000,
    price_per_liter_at_order: 68.0,
  },
  {
    id: "oi_14",
    order_id: "ord_12",
    fuel_type_id: "ft_4",
    quantity_liters: 2000,
    price_per_liter_at_order: 78.5,
  },
  // Items for Order 13 (ord_13)
  {
    id: "oi_15",
    order_id: "ord_13",
    fuel_type_id: "ft_2",
    quantity_liters: 5000,
    price_per_liter_at_order: 71.25,
  },
];

// Mock low inventory alerts
const initialLowInventoryAlerts = [
  {
    fuelTypeId: "ft_1",
    fuelTypeName: "Diesel",
    level: 15000,
    capacity: 100000,
  },
  {
    fuelTypeId: "ft_4",
    fuelTypeName: "Premium Gasoline 97 RON",
    level: 3000,
    capacity: 20000,
  },
];

const DepotStaffDashboard: React.FC = () => {
  // Mock data states
  const [trucks] = useState<MockTruck[]>(initialMockTrucks);
  const [confirmedOrders] = useState<Order[]>(initialConfirmedOrders);
  const [activeDeliveries] = useState(initialActiveDeliveries);
  const [orderItems] = useState<OrderItem[]>(initialMockOrderItems);
  const [lowInventoryAlerts] = useState(initialLowInventoryAlerts);

  // Calculate available trucks
  const availableTrucksCount = useMemo(
    () =>
      trucks.filter((truck) => truck.status === TruckStatus.Available).length,
    [trucks]
  );

  // Calculate stats
  const stats = useMemo(
    () => ({
      confirmedOrdersCount: confirmedOrders.length,
      availableTrucks: availableTrucksCount,
      activeDeliveriesCount: activeDeliveries.length,
    }),
    [confirmedOrders, availableTrucksCount, activeDeliveries]
  );

  // Helper function to get order items summary
  const getOrderItemsSummary = (orderId: string) => {
    const items = orderItems.filter((item) => item.order_id === orderId);
    if (items.length === 0) return "No items";

    const totalLiters = items.reduce(
      (sum, item) => sum + item.quantity_liters,
      0
    );

    if (items.length === 1) {
      return `${
        mockFuelTypeMap[items[0].fuel_type_id]?.name
      }: ${items[0].quantity_liters.toLocaleString()} L`;
    }

    return `${items.length} types, ${totalLiters.toLocaleString()} L total`;
  };

  // Handle quick action buttons
  const handleRecordReplenishment = () => {
    alert("Record Replenishment modal not implemented yet.");
  };

  const handleRecordAdjustment = () => {
    alert("Record Adjustment modal not implemented yet.");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Depot Staff Dashboard
        </h1>
        <p className="text-gray-600 mt-1">
          Manage deliveries, trucks, and inventory
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Orders Ready for Scheduling
            </CardTitle>
            <ClipboardList className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.confirmedOrdersCount}
            </div>
            <p className="text-xs text-gray-500 mt-1">Awaiting assignment</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Available Trucks
            </CardTitle>
            <Truck className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.availableTrucks}</div>
            <p className="text-xs text-gray-500 mt-1">Ready for dispatch</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Active Deliveries/Pickups
            </CardTitle>
            <CalendarPlus className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.activeDeliveriesCount}
            </div>
            <p className="text-xs text-gray-500 mt-1">In progress</p>
          </CardContent>
        </Card>
      </div>

      {/* Scheduling Section */}
      <Card>
        <CardHeader>
          <CardTitle>Confirmed Orders Awaiting Scheduling</CardTitle>
          <CardDescription>
            Orders that need to be scheduled for delivery or pickup
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Station</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Fuels</TableHead>
                <TableHead>Confirmed</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {confirmedOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No orders awaiting scheduling.
                  </TableCell>
                </TableRow>
              ) : (
                confirmedOrders.slice(0, 5).map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      {mockGasStationMap[order.gas_station_id]?.name ||
                        order.gas_station_id}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          order.order_type === OrderType.Delivery
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                            : "bg-green-100 text-green-800 hover:bg-green-100"
                        }
                      >
                        {order.order_type}
                      </Badge>
                    </TableCell>
                    <TableCell>{getOrderItemsSummary(order.id)}</TableCell>
                    <TableCell>
                      {new Date(order.updated_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-indigo-900 text-indigo-900 hover:bg-indigo-50"
                        asChild
                      >
                        <Link to={`/orders`}>Schedule</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Active Runs Section */}
      <Card>
        <CardHeader>
          <CardTitle>Ongoing Deliveries / Ready Pickups</CardTitle>
          <CardDescription>
            Currently active deliveries and orders ready for pickup
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Run/Order ID</TableHead>
                <TableHead>Truck</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Scheduled Time</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeDeliveries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No active deliveries or pickups.
                  </TableCell>
                </TableRow>
              ) : (
                activeDeliveries.map((delivery) => (
                  <TableRow key={delivery.id}>
                    <TableCell className="font-medium">{delivery.id}</TableCell>
                    <TableCell>
                      {delivery.truck_id
                        ? trucks.find((t) => t.id === delivery.truck_id)
                            ?.plate_number || delivery.truck_id
                        : "N/A (Pickup)"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          delivery.status === "out_for_delivery"
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                            : "bg-green-100 text-green-800 hover:bg-green-100"
                        }
                      >
                        {delivery.status === "out_for_delivery"
                          ? "Out For Delivery"
                          : "Ready For Pickup"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {mockGasStationMap[delivery.destination]?.name ||
                        delivery.destination}
                    </TableCell>
                    <TableCell>
                      {new Date(delivery.scheduled_time).toLocaleTimeString(
                        [],
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-indigo-900 text-indigo-900 hover:bg-indigo-50"
                        asChild
                      >
                        <Link to={`/orders`}>Details</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inventory/Trucks Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common depot staff tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button className="bg-indigo-900 hover:bg-indigo-800" asChild>
                <Link to="/trucks">
                  <Truck className="mr-2 h-4 w-4" /> Manage Trucks
                </Link>
              </Button>
              <Button className="bg-indigo-900 hover:bg-indigo-800" asChild>
                <Link to="/inventory">
                  <Database className="mr-2 h-4 w-4" /> View Inventory
                </Link>
              </Button>
              <Button
                variant="outline"
                className="border-indigo-900 text-indigo-900 hover:bg-indigo-50"
                onClick={handleRecordReplenishment}
              >
                <TrendingUp className="mr-2 h-4 w-4" /> Record Replenishment
              </Button>
              <Button
                variant="outline"
                className="border-indigo-900 text-indigo-900 hover:bg-indigo-50"
                onClick={handleRecordAdjustment}
              >
                <RefreshCw className="mr-2 h-4 w-4" /> Record Adjustment
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Alerts Section */}
        <Card>
          <CardHeader>
            <CardTitle>System Alerts</CardTitle>
            <CardDescription>Issues requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowInventoryAlerts.map((alert) => (
                <div
                  key={alert.fuelTypeId}
                  className="flex items-start space-x-3 p-3 bg-amber-50 border border-amber-200 rounded-md"
                >
                  <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-amber-800">
                      Low Inventory Alert
                    </h4>
                    <p className="text-sm text-amber-700">
                      {alert.fuelTypeName} level is at{" "}
                      {alert.level.toLocaleString()} liters (
                      {Math.round((alert.level / alert.capacity) * 100)}% of
                      capacity)
                    </p>
                    <p className="text-xs text-amber-600 mt-1">
                      Consider scheduling a replenishment soon
                    </p>
                  </div>
                </div>
              ))}

              {trucks.some((t) => t.status === TruckStatus.Unavailable) && (
                <div className="flex items-start space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <Wrench className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-800">
                      Truck Maintenance
                    </h4>
                    <p className="text-sm text-blue-700">
                      {
                        trucks.filter(
                          (t) => t.status === TruckStatus.Unavailable
                        ).length
                      }{" "}
                      truck(s) currently undergoing maintenance
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                      Regular maintenance helps prevent delivery delays
                    </p>
                  </div>
                </div>
              )}

              {lowInventoryAlerts.length === 0 &&
                !trucks.some((t) => t.status === TruckStatus.Unavailable) && (
                  <div className="text-center text-gray-500 py-4">
                    No alerts at this time
                  </div>
                )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DepotStaffDashboard;
