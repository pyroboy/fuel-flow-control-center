import React, { useState, useMemo } from "react"; // Import useState and useMemo
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"; // Import CardDescription
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; // Import Badge (might be needed for status)
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Import Table components (for future use)
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Import Dropdown (for future use)
import { PlusCircle, MoreHorizontal } from "lucide-react"; // Import MoreHorizontal (for future use)
import { toast } from "sonner"; // Use sonner for feedback

// Import necessary types
import {
  Order,
  OrderItem,
  OrderStatus,
  OrderType,
  PaymentMethod,
  PaymentStatus,
  UserRole,
} from "@/types";

// --- Mock Data Integrated Here ---

// Helper Maps (You might fetch/manage this differently in a real app)
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

const mockFuelTypeMap: Record<string, { name: string }> = {
  ft_1: { name: "Diesel" },
  ft_2: { name: "Gasoline 95 RON" },
  ft_3: { name: "Kerosene" }, // Currently unavailable
  ft_4: { name: "Premium Gasoline 97 RON" },
};

// Mock Order Data
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
    id: "ord_2",
    gas_station_id: "gso_sta_4", // North Star Gas
    placed_by_user_id: "usr_5", // Ethan Hunt (GSO Staff)
    order_type: OrderType.Pickup,
    status: OrderStatus.Confirmed, // Confirmed by office
    payment_method: PaymentMethod.Cheque,
    payment_status: PaymentStatus.Pending, // Awaiting cheque clearing
    confirmed_by_user_id: "usr_2", // Bob The Builder (Office Staff)
    created_at: "2025-04-13T15:30:00Z", // Yesterday
    updated_at: "2025-04-14T09:15:00Z", // Confirmed today
  },
  {
    id: "ord_3",
    gas_station_id: "gso_sta_1", // Prince Fuels Station 1
    placed_by_user_id: "usr_4", // Diana Prince (GSO)
    order_type: OrderType.Delivery,
    status: OrderStatus.Scheduled, // Scheduled for delivery run
    payment_method: PaymentMethod.Cash,
    payment_status: PaymentStatus.Pending,
    confirmed_by_user_id: "usr_2", // Bob The Builder (Office Staff)
    // delivery_run_id would link this (not shown here)
    created_at: "2025-04-12T11:00:00Z",
    updated_at: "2025-04-13T10:00:00Z", // Scheduled yesterday
  },
  {
    id: "ord_4",
    gas_station_id: "gso_sta_5", // Valley Petroleum
    placed_by_user_id: "usr_4", // Diana (assuming she manages multiple GSOs or placed on behalf)
    order_type: OrderType.Delivery,
    status: OrderStatus.OutForDelivery, // Currently on a truck
    payment_method: PaymentMethod.Cheque,
    payment_status: PaymentStatus.Completed, // Paid upfront/verified
    payment_verified_by_user_id: "usr_2", // Bob The Builder (Office Staff)
    confirmed_by_user_id: "usr_2",
    // delivery_run_id would link this
    created_at: "2025-04-11T08:45:00Z",
    updated_at: "2025-04-14T08:00:00Z", // Went out for delivery today
  },
  {
    id: "ord_5",
    gas_station_id: "gso_sta_3", // Eastside Fuels
    placed_by_user_id: "usr_4", // Diana Prince (GSO)
    order_type: OrderType.Delivery,
    status: OrderStatus.Delivered, // Completed delivery
    payment_method: PaymentMethod.Cash,
    payment_status: PaymentStatus.Completed, // Driver confirmed cash received
    payment_verified_by_user_id: "usr_3", // Charlie Chaplin (Depot Staff/Driver)
    confirmed_by_user_id: "usr_2",
    created_at: "2025-04-10T09:00:00Z",
    updated_at: "2025-04-12T14:00:00Z", // Delivered 2 days ago
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
    id: "ord_7",
    gas_station_id: "gso_sta_4", // North Star Gas
    placed_by_user_id: "usr_5", // Ethan Hunt (GSO Staff)
    order_type: OrderType.Pickup,
    status: OrderStatus.PickedUp, // Completed pickup
    payment_method: PaymentMethod.Cheque,
    payment_status: PaymentStatus.Completed,
    payment_verified_by_user_id: "usr_2", // Bob The Builder (Office Staff)
    confirmed_by_user_id: "usr_2",
    pickup_ready_by_user_id: "usr_3",
    pickup_completed_datetime: "2025-04-11T16:30:00Z", // Picked up 3 days ago
    created_at: "2025-04-09T12:00:00Z",
    updated_at: "2025-04-11T16:30:00Z",
  },
  {
    id: "ord_8",
    gas_station_id: "gso_sta_5", // Valley Petroleum
    placed_by_user_id: "usr_4", // Diana
    order_type: OrderType.Delivery,
    status: OrderStatus.Cancelled, // Cancelled order
    payment_method: PaymentMethod.Cash,
    payment_status: PaymentStatus.Pending, // Never paid
    internal_notes: "Customer double booked. Cancelled by GSO.",
    created_at: "2025-04-12T16:00:00Z",
    updated_at: "2025-04-13T09:00:00Z", // Cancelled yesterday
  },
];

// Mock Order Item Data
const initialMockOrderItems: OrderItem[] = [
  // Items for Order 1 (ord_1)
  {
    id: "oi_1",
    order_id: "ord_1",
    fuel_type_id: "ft_1",
    quantity_liters: 5000,
    price_per_liter_at_order: 68.0,
  }, // Current Diesel price

  // Items for Order 2 (ord_2)
  {
    id: "oi_2",
    order_id: "ord_2",
    fuel_type_id: "ft_2",
    quantity_liters: 3000,
    price_per_liter_at_order: 71.25,
  }, // Current Gas 95 price

  // Items for Order 3 (ord_3)
  {
    id: "oi_3",
    order_id: "ord_3",
    fuel_type_id: "ft_4",
    quantity_liters: 8000,
    price_per_liter_at_order: 78.5,
  }, // Current Premium 97 price

  // Items for Order 4 (ord_4)
  {
    id: "oi_4",
    order_id: "ord_4",
    fuel_type_id: "ft_1",
    quantity_liters: 10000,
    price_per_liter_at_order: 68.0,
  }, // Diesel price at time of order

  // Items for Order 5 (ord_5) - Multiple items
  {
    id: "oi_5",
    order_id: "ord_5",
    fuel_type_id: "ft_1",
    quantity_liters: 4000,
    price_per_liter_at_order: 68.0,
  }, // Diesel price at time of order
  {
    id: "oi_6",
    order_id: "ord_5",
    fuel_type_id: "ft_2",
    quantity_liters: 2000,
    price_per_liter_at_order: 71.25,
  }, // Gas 95 price at time of order

  // Items for Order 6 (ord_6)
  {
    id: "oi_7",
    order_id: "ord_6",
    fuel_type_id: "ft_4",
    quantity_liters: 1500,
    price_per_liter_at_order: 78.5,
  }, // Premium 97 price

  // Items for Order 7 (ord_7)
  {
    id: "oi_8",
    order_id: "ord_7",
    fuel_type_id: "ft_1",
    quantity_liters: 2500,
    price_per_liter_at_order: 68.0,
  }, // Diesel price at time of order

  // Items for Order 8 (ord_8)
  {
    id: "oi_9",
    order_id: "ord_8",
    fuel_type_id: "ft_2",
    quantity_liters: 5000,
    price_per_liter_at_order: 71.25,
  }, // Gas 95 price at time of order
];

// --- End Mock Data ---

const Orders: React.FC = () => {
  // Use state to hold the mock data
  const [orders, setOrders] = useState<Order[]>(initialMockOrders);
  const [orderItems, setOrderItems] = useState<OrderItem[]>(
    initialMockOrderItems
  );

  // Placeholder handler for the "New Order" button
  const handleNewOrder = () => {
    toast.info("New Order functionality not implemented yet.");
    // TODO: Implement logic to open a new order form/modal
  };

  // Calculate total order value (example derived data) - you'd likely do this per order
  const totalOrderValue = useMemo(() => {
    return orderItems.reduce(
      (sum, item) => sum + item.quantity_liters * item.price_per_liter_at_order,
      0
    );
  }, [orderItems]);

  // Log data on mount (for debugging/verification)
  React.useEffect(() => {
    console.log("Loaded Mock Orders:", orders);
    console.log("Loaded Mock Order Items:", orderItems);
    console.log("Calculated Total Value (All Mock Items):", totalOrderValue);
  }, [orders, orderItems, totalOrderValue]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Order Management</h1>
          <p className="text-gray-600 mt-1">Track and manage fuel orders</p>
        </div>
        <Button
          className="bg-indigo-900 hover:bg-indigo-800"
          onClick={handleNewOrder}
        >
          <PlusCircle className="mr-2 h-4 w-4" /> New Order
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order Dashboard</CardTitle>
          <CardDescription>
            Displaying {orders.length} mock orders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Station</TableHead>
                <TableHead>Placed By</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    No orders found.
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      {mockGasStationMap[order.gas_station_id]?.name ||
                        order.gas_station_id}
                    </TableCell>
                    <TableCell>
                      {mockUserMap[order.placed_by_user_id]?.name ||
                        order.placed_by_user_id}
                    </TableCell>
                    <TableCell>{order.order_type}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`
                          ${
                            order.status === OrderStatus.Delivered ||
                            order.status === OrderStatus.PickedUp
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : order.status === OrderStatus.OutForDelivery
                              ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                              : order.status === OrderStatus.Pending ||
                                order.status === OrderStatus.Confirmed ||
                                order.status === OrderStatus.Scheduled ||
                                order.status === OrderStatus.ReadyForPickup
                              ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                              : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                          }
                        `}
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`
                          ${
                            order.payment_status === PaymentStatus.Completed
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : "bg-amber-100 text-amber-800 hover:bg-amber-100"
                          }
                        `}
                      >
                        {order.payment_status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(order.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() =>
                              alert(`View details for order: ${order.id}`)
                            }
                          >
                            View Details
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;
