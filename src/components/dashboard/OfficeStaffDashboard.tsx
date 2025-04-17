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
  FileClock,
  ClipboardCheck,
  DollarSign,
  MessageSquare,
  Droplet,
} from "lucide-react";
import {
  Order,
  OrderStatus,
  OrderType,
  PaymentMethod,
  PaymentStatus,
  UserRole,
  OrderItem,
} from "@/types";

// Mock data from Orders.tsx
const mockUserMap: Record<string, { name: string; role: UserRole }> = {
  usr_1: { name: "Alice Wonderland", role: UserRole.Admin },
  usr_2: { name: "Bob The Builder", role: UserRole.OfficeStaff },
  usr_3: { name: "Charlie Chaplin", role: UserRole.DepotStaff },
  usr_4: { name: "Diana Prince", role: UserRole.GSO },
  usr_5: { name: "Ethan Hunt", role: UserRole.GSOStaff },
  usr_6: { name: "Fiona Shrek", role: UserRole.GSO }, // Pending registration
};

const mockGasStationMap: Record<string, { name: string; ownerId?: string }> = {
  gso_sta_1: { name: "Prince Fuels Station 1", ownerId: "usr_4" },
  gso_sta_2: { name: "Shrek Gas & Go", ownerId: "usr_6" },
  gso_sta_3: { name: "Eastside Fuels (Rodriguez)" }, // From PendingGSOTable
  gso_sta_4: { name: "North Star Gas (Chen)" }, // From PendingGSOTable
  gso_sta_5: { name: "Valley Petroleum (Nelson)" }, // From PendingGSOTable
};

// Mock data for orders and order items
const initialMockOrders: Order[] = [
  {
    id: "ord_1",
    gas_station_id: "gso_sta_3", // Eastside Fuels
    placed_by_user_id: "usr_4", // Diana Prince (GSO)
    order_type: OrderType.Delivery,
    status: OrderStatus.Pending, // Needs confirmation
    payment_method: PaymentMethod.Cash,
    payment_status: PaymentStatus.Pending,
    internal_notes: "High priority request.",
    flags: ["priority"],
    created_at: "2025-04-14T10:00:00Z", // Today
    updated_at: "2025-04-14T10:00:00Z",
  },
  {
    id: "ord_9", // Adding a new mock order specifically for the dashboard
    gas_station_id: "gso_sta_2", // Shrek Gas & Go
    placed_by_user_id: "usr_6", // Fiona Shrek (GSO)
    order_type: OrderType.Delivery,
    status: OrderStatus.Pending, // Needs confirmation
    payment_method: PaymentMethod.Cheque,
    payment_status: PaymentStatus.Pending,
    created_at: "2025-04-14T08:30:00Z", // Today
    updated_at: "2025-04-14T08:30:00Z",
  },
  {
    id: "ord_6",
    gas_station_id: "gso_sta_1", // Prince Fuels Station 1
    placed_by_user_id: "usr_5", // Ethan Hunt (GSO Staff)
    order_type: OrderType.Pickup,
    status: OrderStatus.ReadyForPickup, // Prepared at depot
    payment_method: PaymentMethod.Cash,
    payment_status: PaymentStatus.Pending, // Pay on pickup
    confirmed_by_user_id: "usr_2",
    pickup_ready_by_user_id: "usr_3", // Charlie Chaplin (Depot Staff)
    pickup_scheduled_datetime: "2025-04-14T14:00:00Z", // Scheduled for this afternoon
    created_at: "2025-04-13T10:00:00Z",
    updated_at: "2025-04-14T11:00:00Z", // Marked as ready today
  },
  {
    id: "ord_10", // Adding a new mock order for delivered but unpaid
    gas_station_id: "gso_sta_5", // Valley Petroleum
    placed_by_user_id: "usr_4", // Diana Prince (GSO)
    order_type: OrderType.Delivery,
    status: OrderStatus.Delivered, // Delivered
    payment_method: PaymentMethod.Cheque,
    payment_status: PaymentStatus.Pending, // Not yet verified
    confirmed_by_user_id: "usr_2",
    created_at: "2025-04-12T09:00:00Z",
    updated_at: "2025-04-13T15:20:00Z", // Delivered yesterday
  },
  {
    id: "ord_11", // Adding another mock order for picked up but unpaid
    gas_station_id: "gso_sta_4", // North Star Gas
    placed_by_user_id: "usr_5", // Ethan Hunt (GSO Staff)
    order_type: OrderType.Pickup,
    status: OrderStatus.PickedUp, // Picked up
    payment_method: PaymentMethod.Cash,
    payment_status: PaymentStatus.Pending, // Not yet verified
    confirmed_by_user_id: "usr_2",
    pickup_ready_by_user_id: "usr_3",
    pickup_completed_datetime: "2025-04-14T10:30:00Z", // Picked up today
    created_at: "2025-04-13T14:00:00Z",
    updated_at: "2025-04-14T10:30:00Z",
  },
];

const initialMockOrderItems: OrderItem[] = [
  // Items for Order 1 (ord_1)
  {
    id: "oi_1",
    order_id: "ord_1",
    fuel_type_id: "ft_1",
    quantity_liters: 5000,
    price_per_liter_at_order: 68.0,
  },
  // Items for Order 9 (ord_9)
  {
    id: "oi_10",
    order_id: "ord_9",
    fuel_type_id: "ft_2",
    quantity_liters: 4000,
    price_per_liter_at_order: 71.25,
  },
  // Items for Order 6 (ord_6)
  {
    id: "oi_7",
    order_id: "ord_6",
    fuel_type_id: "ft_4",
    quantity_liters: 1500,
    price_per_liter_at_order: 78.5,
  },
  // Items for Order 10 (ord_10)
  {
    id: "oi_11",
    order_id: "ord_10",
    fuel_type_id: "ft_1",
    quantity_liters: 7500,
    price_per_liter_at_order: 68.0,
  },
  // Items for Order 11 (ord_11)
  {
    id: "oi_12",
    order_id: "ord_11",
    fuel_type_id: "ft_2",
    quantity_liters: 3500,
    price_per_liter_at_order: 71.25,
  },
];

const OfficeStaffDashboard: React.FC = () => {
  // Mock data filtered for Office Staff needs
  const [orders] = useState<Order[]>(initialMockOrders);
  const [orderItems] = useState<OrderItem[]>(initialMockOrderItems);

  // Filter the orders that are pending and need confirmation
  const pendingOrders = useMemo(
    () => orders.filter((order) => order.status === OrderStatus.Pending),
    [orders]
  );

  // Filter orders that are delivered or picked up but payment not verified
  const ordersNeedingPaymentVerification = useMemo(
    () =>
      orders.filter(
        (order) =>
          (order.status === OrderStatus.Delivered ||
            order.status === OrderStatus.PickedUp) &&
          order.payment_status === PaymentStatus.Pending
      ),
    [orders]
  );

  // Calculate statistics
  const stats = useMemo(
    () => ({
      pendingOrdersCount: pendingOrders.length,
      paymentVerificationCount: ordersNeedingPaymentVerification.length,
    }),
    [pendingOrders, ordersNeedingPaymentVerification]
  );

  // Calculate order total amount
  const getOrderTotal = (orderId: string) => {
    const items = orderItems.filter((item) => item.order_id === orderId);
    return items.reduce(
      (sum, item) => sum + item.quantity_liters * item.price_per_liter_at_order,
      0
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Office Staff Dashboard
        </h1>
        <p className="text-gray-600 mt-1">
          Manage orders, verify payments, and process requests
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Pending Orders
            </CardTitle>
            <FileClock className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingOrdersCount}</div>
            <p className="text-xs text-gray-500 mt-1">Require confirmation</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Payment Verification
            </CardTitle>
            <ClipboardCheck className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.paymentVerificationCount}
            </div>
            <p className="text-xs text-gray-500 mt-1">Awaiting verification</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Price Updates</CardTitle>
            <DollarSign className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-gray-500 mt-1">Pending approval</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">New Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-gray-500 mt-1">Unread notifications</p>
          </CardContent>
        </Card>
      </div>

      {/* Pending Orders Section */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Orders Requiring Confirmation</CardTitle>
          <CardDescription>
            New orders submitted by GSOs awaiting your review
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Station</TableHead>
                <TableHead>Placed By</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date Submitted</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No pending orders.
                  </TableCell>
                </TableRow>
              ) : (
                pendingOrders.slice(0, 5).map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">
                      {mockGasStationMap[order.gas_station_id]?.name ||
                        order.gas_station_id}
                    </TableCell>
                    <TableCell>
                      {mockUserMap[order.placed_by_user_id]?.name ||
                        order.placed_by_user_id}
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
                    <TableCell>
                      {new Date(order.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-indigo-900 text-indigo-900 hover:bg-indigo-50"
                        asChild
                      >
                        <Link to={`/orders`}>Review</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Payment Verification Section */}
      <Card>
        <CardHeader>
          <CardTitle>Orders Awaiting Payment Verification</CardTitle>
          <CardDescription>
            Completed orders awaiting payment verification
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Station</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ordersNeedingPaymentVerification.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No orders awaiting payment verification.
                  </TableCell>
                </TableRow>
              ) : (
                ordersNeedingPaymentVerification.slice(0, 5).map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      {mockGasStationMap[order.gas_station_id]?.name ||
                        order.gas_station_id}
                    </TableCell>
                    <TableCell>
                      ₱{getOrderTotal(order.id).toLocaleString()}
                    </TableCell>
                    <TableCell>{order.payment_method}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          order.status === OrderStatus.Delivered
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                        }
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-indigo-900 text-indigo-900 hover:bg-indigo-50"
                        asChild
                      >
                        <Link to={`/orders`}>Verify</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Actions Section */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Commonly used tools and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="bg-indigo-900 hover:bg-indigo-800" asChild>
              <Link to="/fuel-settings">
                <Droplet className="mr-2 h-4 w-4" /> Update Fuel Prices
              </Link>
            </Button>
            <Button className="bg-indigo-900 hover:bg-indigo-800" asChild>
              <Link to="/messages">
                <MessageSquare className="mr-2 h-4 w-4" /> View Messages
              </Link>
            </Button>
            <Button
              variant="outline"
              className="border-indigo-900 text-indigo-900 hover:bg-indigo-50"
              asChild
            >
              <Link to="/reports">
                <DollarSign className="mr-2 h-4 w-4" /> Generate Sales Report
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OfficeStaffDashboard;
