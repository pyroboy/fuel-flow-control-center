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
  MapPin,
  ShoppingCart,
  ClipboardList,
  PlusCircle,
  MessageSquare,
  Home,
  Clock,
  CheckCircle,
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

const GSOStaffDashboard: React.FC = () => {
  const { currentUser } = useAuthContext();
  const staffId = currentUser?.id || "usr_5"; // Default to mock ID if not authenticated
  const assignedStationId = "station_1"; // This would come from currentUser in a real app

  // Mock data: Assigned gas station for this staff member
  const mockAssignedStation: GasStation = {
    id: assignedStationId,
    owner_id: "usr_4", // GSO owner
    name: "Downtown Fuel Station",
    address: "123 Main St, Downtown",
    created_at: "2023-01-15T08:30:00Z",
    updated_at: "2023-05-20T14:45:00Z",
    is_active: true,
  };

  // Mock data: Orders placed by this staff member
  const mockOrders: Order[] = [
    {
      id: "order_101",
      gas_station_id: assignedStationId,
      placed_by_user_id: staffId,
      order_type: OrderType.Delivery,
      status: OrderStatus.Pending,
      payment_method: PaymentMethod.Cash,
      payment_status: PaymentStatus.Pending,
      created_at: "2023-09-10T08:30:00Z",
      updated_at: "2023-09-10T08:30:00Z",
    },
    {
      id: "order_102",
      gas_station_id: assignedStationId,
      placed_by_user_id: staffId,
      order_type: OrderType.Pickup,
      status: OrderStatus.Confirmed,
      payment_method: PaymentMethod.Cheque,
      payment_status: PaymentStatus.Completed,
      created_at: "2023-09-09T09:15:00Z",
      updated_at: "2023-09-09T11:45:00Z",
    },
    {
      id: "order_103",
      gas_station_id: assignedStationId,
      placed_by_user_id: staffId,
      order_type: OrderType.Delivery,
      status: OrderStatus.Scheduled,
      payment_method: PaymentMethod.Cash,
      payment_status: PaymentStatus.Pending,
      created_at: "2023-09-08T10:00:00Z",
      updated_at: "2023-09-08T14:30:00Z",
    },
    {
      id: "order_104",
      gas_station_id: assignedStationId,
      placed_by_user_id: staffId,
      order_type: OrderType.Pickup,
      status: OrderStatus.ReadyForPickup,
      payment_method: PaymentMethod.Cash,
      payment_status: PaymentStatus.Pending,
      created_at: "2023-09-07T11:30:00Z",
      updated_at: "2023-09-07T15:45:00Z",
    },
    {
      id: "order_105",
      gas_station_id: assignedStationId,
      placed_by_user_id: staffId,
      order_type: OrderType.Delivery,
      status: OrderStatus.OutForDelivery,
      payment_method: PaymentMethod.Cheque,
      payment_status: PaymentStatus.Completed,
      created_at: "2023-09-06T09:45:00Z",
      updated_at: "2023-09-06T13:15:00Z",
    },
    {
      id: "order_106",
      gas_station_id: assignedStationId,
      placed_by_user_id: staffId,
      order_type: OrderType.Delivery,
      status: OrderStatus.Delivered,
      payment_method: PaymentMethod.Cash,
      payment_status: PaymentStatus.Completed,
      created_at: "2023-09-05T08:15:00Z",
      updated_at: "2023-09-05T16:30:00Z",
    },
    {
      id: "order_107",
      gas_station_id: assignedStationId,
      placed_by_user_id: staffId,
      order_type: OrderType.Pickup,
      status: OrderStatus.PickedUp,
      payment_method: PaymentMethod.Cash,
      payment_status: PaymentStatus.Completed,
      created_at: "2023-09-04T10:30:00Z",
      updated_at: "2023-09-04T15:00:00Z",
    },
  ];

  // Calculate stats
  const statistics = useMemo(() => {
    // Count pending orders (pending or confirmed)
    const pendingOrders = mockOrders.filter(
      (order) =>
        order.status === OrderStatus.Pending ||
        order.status === OrderStatus.Confirmed
    ).length;

    // Count active orders (scheduled, out for delivery, ready for pickup)
    const activeOrders = mockOrders.filter(
      (order) =>
        order.status === OrderStatus.Scheduled ||
        order.status === OrderStatus.OutForDelivery ||
        order.status === OrderStatus.ReadyForPickup
    ).length;

    // Count completed orders (delivered, picked up)
    const completedOrders = mockOrders.filter(
      (order) =>
        order.status === OrderStatus.Delivered ||
        order.status === OrderStatus.PickedUp
    ).length;

    // Count orders by type
    const deliveryOrders = mockOrders.filter(
      (order) => order.order_type === OrderType.Delivery
    ).length;

    const pickupOrders = mockOrders.filter(
      (order) => order.order_type === OrderType.Pickup
    ).length;

    return {
      pendingOrders,
      activeOrders,
      completedOrders,
      deliveryOrders,
      pickupOrders,
      totalOrders: mockOrders.length,
    };
  }, [mockOrders]);

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
        <h1 className="text-3xl font-bold text-gray-800">Staff Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome, {currentUser?.name || "GSO Staff Member"}. Manage orders for
          your station.
        </p>
      </div>

      {/* Assigned Station Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Assigned Station</CardTitle>
          <MapPin className="h-5 w-5 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="bg-indigo-100 p-3 rounded-full">
              <Home className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">
                {mockAssignedStation.name}
              </h3>
              <p className="text-sm text-gray-500">
                {mockAssignedStation.address}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              My Pending Orders
            </CardTitle>
            <Clock className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.pendingOrders}</div>
            <p className="text-xs text-gray-500">
              Orders awaiting confirmation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              My Active Orders
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.activeOrders}</div>
            <p className="text-xs text-gray-500">Orders in progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Orders
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statistics.completedOrders}
            </div>
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
          <CardTitle>My Recent Orders</CardTitle>
          <CardDescription>Latest orders you've placed</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Date Placed</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
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
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        order.payment_status === PaymentStatus.Completed
                          ? "bg-green-100 text-green-800 border-green-500"
                          : "bg-yellow-100 text-yellow-800 border-yellow-500"
                      }
                    >
                      {order.payment_status}
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
          <CardDescription>Common tasks for station management</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/place-order">
              <Button className="w-full" variant="default">
                <PlusCircle className="mr-2 h-4 w-4" />
                Place New Order
              </Button>
            </Link>
            <Link to="/orders">
              <Button className="w-full" variant="default">
                <ClipboardList className="mr-2 h-4 w-4" />
                View All My Orders
              </Button>
            </Link>
            <Link to="/messages">
              <Button className="w-full" variant="default">
                <MessageSquare className="mr-2 h-4 w-4" />
                Messages
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Order Type Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Order Type Distribution</CardTitle>
          <CardDescription>Breakdown of your order types</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-6">
            <div className="flex-1">
              <h4 className="text-sm font-medium mb-1">Delivery Orders</h4>
              <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{
                    width: `${
                      (statistics.deliveryOrders / statistics.totalOrders) * 100
                    }%`,
                  }}
                ></div>
              </div>
              <p className="text-sm mt-1">
                {statistics.deliveryOrders} orders (
                {Math.round(
                  (statistics.deliveryOrders / statistics.totalOrders) * 100
                )}
                %)
              </p>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium mb-1">Pickup Orders</h4>
              <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{
                    width: `${
                      (statistics.pickupOrders / statistics.totalOrders) * 100
                    }%`,
                  }}
                ></div>
              </div>
              <p className="text-sm mt-1">
                {statistics.pickupOrders} orders (
                {Math.round(
                  (statistics.pickupOrders / statistics.totalOrders) * 100
                )}
                %)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GSOStaffDashboard;
