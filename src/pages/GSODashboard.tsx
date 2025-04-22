import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  UserPlus,
  BarChart,
  ClipboardList,
  Home,
  TrendingUp,
  Users,
  Building,
} from "lucide-react";
import {
  Order,
  Profile,
  UserRole,
  OrderStatus,
  GasStation,
  OrderType,
  PaymentMethod,
  PaymentStatus,
} from "@/types";
import { useAuthContext } from "@/context/AuthContext";
import { format } from "date-fns";

// Helper function to get status badge color
const getStatusBadgeColor = (status: OrderStatus): string => {
  switch (status) {
    case OrderStatus.Pending:
      return "bg-yellow-500";
    case OrderStatus.Confirmed:
      return "bg-blue-500";
    case OrderStatus.Scheduled:
      return "bg-purple-500";
    case OrderStatus.OutForDelivery:
      return "bg-indigo-500";
    case OrderStatus.Delivered:
      return "bg-green-500";
    case OrderStatus.ReadyForPickup:
      return "bg-teal-500";
    case OrderStatus.PickedUp:
      return "bg-green-500";
    case OrderStatus.Cancelled:
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

// Format date for display
const formatDate = (dateString: string): string => {
  try {
    return format(new Date(dateString), "MMM dd, yyyy h:mm a");
  } catch (e) {
    return dateString;
  }
};

const GSODashboard: React.FC = () => {
  const { currentUser } = useAuthContext();
  const gsoId = currentUser?.id || "usr_4"; // Default to mock ID if not authenticated

  // Mock data: Gas stations owned by this GSO
  const mockGasStations: GasStation[] = [
    {
      id: "station_1",
      owner_id: gsoId,
      name: "Downtown Fuel Station",
      address: "123 Main St, Downtown",
      created_at: "2023-01-15T08:30:00Z",
      updated_at: "2023-05-20T14:45:00Z",
      is_active: true,
    },
    {
      id: "station_2",
      owner_id: gsoId,
      name: "Highway Express Gas",
      address: "456 Highway Blvd, Northside",
      created_at: "2023-02-22T09:15:00Z",
      updated_at: "2023-06-10T11:20:00Z",
      is_active: true,
    },
    {
      id: "station_3",
      owner_id: gsoId,
      name: "Suburban Fuels",
      address: "789 Residential Dr, Westside",
      created_at: "2023-03-05T10:45:00Z",
      updated_at: "2023-07-15T16:30:00Z",
      is_active: true,
    },
  ];

  // Mock data: Staff managed by this GSO
  const mockStaff: Profile[] = [
    {
      id: "staff_1",
      full_name: "Maria Garcia",
      role: UserRole.GSOStaff,
      is_active: true,
      assigned_station_id: "station_1",
      created_at: "2023-01-20T09:00:00Z",
      updated_at: "2023-05-25T13:30:00Z",
    },
    {
      id: "staff_2",
      full_name: "James Wilson",
      role: UserRole.GSOStaff,
      is_active: true,
      assigned_station_id: "station_2",
      created_at: "2023-02-25T10:30:00Z",
      updated_at: "2023-06-15T14:45:00Z",
    },
    {
      id: "staff_3",
      full_name: "Sophia Lee",
      role: UserRole.GSOStaff,
      is_active: true,
      assigned_station_id: "station_1",
      created_at: "2023-03-10T11:15:00Z",
      updated_at: "2023-07-20T15:20:00Z",
    },
    {
      id: "staff_4",
      full_name: "David Chen",
      role: UserRole.GSOStaff,
      is_active: true,
      assigned_station_id: "station_3",
      created_at: "2023-04-05T08:45:00Z",
      updated_at: "2023-08-12T16:00:00Z",
    },
  ];

  // Mock data: Recent orders related to this GSO's stations
  const mockOrders: Order[] = [
    {
      id: "order_1",
      gas_station_id: "station_1",
      placed_by_user_id: "staff_1",
      order_type: OrderType.Delivery,
      status: OrderStatus.Pending,
      payment_method: PaymentMethod.Cash,
      payment_status: PaymentStatus.Pending,
      created_at: "2023-09-01T08:30:00Z",
      updated_at: "2023-09-01T08:30:00Z",
    },
    {
      id: "order_2",
      gas_station_id: "station_2",
      placed_by_user_id: "staff_2",
      order_type: OrderType.Pickup,
      status: OrderStatus.Confirmed,
      payment_method: PaymentMethod.Cheque,
      payment_status: PaymentStatus.Completed,
      created_at: "2023-09-02T09:15:00Z",
      updated_at: "2023-09-02T11:45:00Z",
    },
    {
      id: "order_3",
      gas_station_id: "station_1",
      placed_by_user_id: "staff_3",
      order_type: OrderType.Delivery,
      status: OrderStatus.Scheduled,
      payment_method: PaymentMethod.Cash,
      payment_status: PaymentStatus.Pending,
      created_at: "2023-09-03T10:00:00Z",
      updated_at: "2023-09-03T14:30:00Z",
    },
    {
      id: "order_4",
      gas_station_id: "station_3",
      placed_by_user_id: "staff_4",
      order_type: OrderType.Pickup,
      status: OrderStatus.ReadyForPickup,
      payment_method: PaymentMethod.Cash,
      payment_status: PaymentStatus.Pending,
      created_at: "2023-09-04T11:30:00Z",
      updated_at: "2023-09-04T15:45:00Z",
    },
    {
      id: "order_5",
      gas_station_id: "station_2",
      placed_by_user_id: "staff_2",
      order_type: OrderType.Delivery,
      status: OrderStatus.OutForDelivery,
      payment_method: PaymentMethod.Cheque,
      payment_status: PaymentStatus.Completed,
      created_at: "2023-09-05T09:45:00Z",
      updated_at: "2023-09-05T13:15:00Z",
    },
    {
      id: "order_6",
      gas_station_id: "station_3",
      placed_by_user_id: "staff_4",
      order_type: OrderType.Delivery,
      status: OrderStatus.Delivered,
      payment_method: PaymentMethod.Cash,
      payment_status: PaymentStatus.Completed,
      created_at: "2023-09-06T08:15:00Z",
      updated_at: "2023-09-06T16:30:00Z",
    },
    {
      id: "order_7",
      gas_station_id: "station_1",
      placed_by_user_id: "staff_1",
      order_type: OrderType.Pickup,
      status: OrderStatus.PickedUp,
      payment_method: PaymentMethod.Cash,
      payment_status: PaymentStatus.Completed,
      created_at: "2023-09-07T10:30:00Z",
      updated_at: "2023-09-07T15:00:00Z",
    },
  ];

  // Create lookup maps for easier data access
  const mockGasStationMap = useMemo(() => {
    const map = new Map<string, GasStation>();
    mockGasStations.forEach((station) => {
      map.set(station.id, station);
    });
    return map;
  }, [mockGasStations]);

  const mockStaffMap = useMemo(() => {
    const map = new Map<string, Profile>();
    mockStaff.forEach((staff) => {
      map.set(staff.id, staff);
    });
    return map;
  }, [mockStaff]);

  // Calculate stats
  const statistics = useMemo(() => {
    const stationCount = mockGasStations.length;
    const staffCount = mockStaff.length;
    const pendingOrders = mockOrders.filter(
      (order) =>
        order.status === OrderStatus.Pending ||
        order.status === OrderStatus.Confirmed
    ).length;
    const totalOrders = mockOrders.length;
    const deliveryOrders = mockOrders.filter(
      (order) => order.order_type === OrderType.Delivery
    ).length;
    const pickupOrders = mockOrders.filter(
      (order) => order.order_type === OrderType.Pickup
    ).length;

    return {
      stationCount,
      staffCount,
      pendingOrders,
      totalOrders,
      deliveryOrders,
      pickupOrders,
    };
  }, [mockGasStations, mockStaff, mockOrders]);

  // Get recent orders for display
  const recentOrders = useMemo(() => {
    return [...mockOrders]
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
      .slice(0, 5);
  }, [mockOrders]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">GSO Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome, {currentUser?.name || "GSO Manager"}. Manage your gas
          stations and orders.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">My Stations</CardTitle>
            <Building className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.stationCount}</div>
            <p className="text-xs text-gray-500">Active gas stations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">My Staff</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.staffCount}</div>
            <p className="text-xs text-gray-500">Total staff members</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Orders
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.pendingOrders}</div>
            <p className="text-xs text-gray-500">Orders to be processed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Order Stats</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.totalOrders}</div>
            <p className="text-xs text-gray-500">
              {statistics.deliveryOrders} deliveries, {statistics.pickupOrders}{" "}
              pickups
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>
            Latest orders from your gas stations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Station Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Placed</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    {mockGasStationMap.get(order.gas_station_id)?.name ||
                      "Unknown Station"}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {order.order_type === OrderType.Delivery
                        ? "Delivery"
                        : "Pickup"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeColor(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(order.created_at)}</TableCell>
                  <TableCell>
                    <Link
                      to={`/orders/${order.id}`}
                      className="text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      View Details
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Link to="/orders">
            <Button variant="outline">View All Orders</Button>
          </Link>
        </CardFooter>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks for GSO management</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/place-order">
              <Button className="w-full" variant="default">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Place New Order
              </Button>
            </Link>
            <Link to="/users">
              <Button className="w-full" variant="default">
                <UserPlus className="mr-2 h-4 w-4" />
                Manage My Staff
              </Button>
            </Link>
            <Link to="/reports">
              <Button className="w-full" variant="default">
                <BarChart className="mr-2 h-4 w-4" />
                View My Reports
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Stations Overview */}
      <Card>
        <CardHeader>
          <CardTitle>My Gas Stations</CardTitle>
          <CardDescription>Overview of your managed stations</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Station Name</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Staff Assigned</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockGasStations.map((station) => {
                const assignedStaff = mockStaff.filter(
                  (staff) => staff.assigned_station_id === station.id
                );
                return (
                  <TableRow key={station.id}>
                    <TableCell className="font-medium">
                      {station.name}
                    </TableCell>
                    <TableCell>{station.address}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          station.is_active ? "bg-green-500" : "bg-red-500"
                        }
                      >
                        {station.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>{assignedStaff.length}</TableCell>
                    <TableCell>
                      <Link
                        to={`/stations/${station.id}`}
                        className="text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        Manage
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default GSODashboard;
