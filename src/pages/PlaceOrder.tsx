import React, { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2, ShoppingCart, Trash2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import {
  OrderType,
  PaymentMethod,
  FuelType,
  FuelPrice,
  UserRole,
} from "@/types";

// --- Mock Data (from FuelSettings) ---
const mockFuelTypes: FuelType[] = [
  {
    id: "ft_1",
    name: "Diesel",
    is_available: true,
    created_at: "2024-12-01T00:00:00Z",
    updated_at: "2025-03-15T00:00:00Z",
  },
  {
    id: "ft_2",
    name: "Gasoline 95 RON",
    is_available: true,
    created_at: "2024-12-01T00:00:00Z",
    updated_at: "2024-12-01T00:00:00Z",
  },
  {
    id: "ft_3",
    name: "Kerosene",
    is_available: false,
    created_at: "2024-12-05T00:00:00Z",
    updated_at: "2025-02-10T00:00:00Z",
  },
  {
    id: "ft_4",
    name: "Premium Gasoline 97 RON",
    is_available: true,
    created_at: "2025-02-01T00:00:00Z",
    updated_at: "2025-02-01T00:00:00Z",
  },
];
const mockFuelPrices: FuelPrice[] = [
  {
    id: "fp_1",
    fuel_type_id: "ft_1",
    delivery_price_per_liter: 65.5,
    pickup_price_per_liter: 64.0,
    effective_from: "2025-03-01T00:00:00Z",
    set_by_user_id: "usr_1",
    created_at: "2025-02-28T10:00:00Z",
  },
  {
    id: "fp_2",
    fuel_type_id: "ft_1",
    delivery_price_per_liter: 68.0,
    pickup_price_per_liter: 66.5,
    effective_from: "2025-04-10T00:00:00Z",
    set_by_user_id: "usr_2",
    created_at: "2025-04-09T15:30:00Z",
  },
  {
    id: "fp_3",
    fuel_type_id: "ft_2",
    delivery_price_per_liter: 72.0,
    pickup_price_per_liter: 70.5,
    effective_from: "2025-03-05T00:00:00Z",
    set_by_user_id: "usr_1",
    created_at: "2025-03-04T11:00:00Z",
  },
  {
    id: "fp_4",
    fuel_type_id: "ft_2",
    delivery_price_per_liter: 71.25,
    pickup_price_per_liter: 69.75,
    effective_from: "2025-04-01T00:00:00Z",
    set_by_user_id: "usr_1",
    created_at: "2025-03-31T09:00:00Z",
  },
  {
    id: "fp_5",
    fuel_type_id: "ft_3",
    delivery_price_per_liter: 75.0,
    pickup_price_per_liter: 73.0,
    effective_from: "2025-01-15T00:00:00Z",
    set_by_user_id: "usr_2",
    created_at: "2025-01-14T16:00:00Z",
  },
  {
    id: "fp_6",
    fuel_type_id: "ft_4",
    delivery_price_per_liter: 78.5,
    pickup_price_per_liter: 77.0,
    effective_from: "2025-04-05T00:00:00Z",
    set_by_user_id: "usr_1",
    created_at: "2025-04-04T14:00:00Z",
  },
  {
    id: "fp_7",
    fuel_type_id: "ft_1",
    delivery_price_per_liter: 70.0,
    pickup_price_per_liter: 68.5,
    effective_from: "2025-05-01T00:00:00Z",
    set_by_user_id: "usr_2",
    created_at: "2025-04-14T17:00:00Z",
  },
];

// Helper to find the currently effective price for a given fuel type ID
const findCurrentPrice = (
  fuelTypeId: string,
  allPrices: FuelPrice[],
  referenceDate: Date
): FuelPrice | undefined => {
  const now = referenceDate.getTime();
  return allPrices
    .filter(
      (p) =>
        p.fuel_type_id === fuelTypeId &&
        new Date(p.effective_from).getTime() <= now
    )
    .sort(
      (a, b) =>
        new Date(b.effective_from).getTime() -
        new Date(a.effective_from).getTime()
    )[0];
};

// --- Zod Schemas and Types ---
const OrderItemSchema = z.object({
  fuelTypeId: z.string(),
  quantity: z.number().positive().min(1),
});

const PlaceOrderSchema = z
  .object({
    orderType: z.nativeEnum(OrderType),
    paymentMethod: z.nativeEnum(PaymentMethod),
    paymentDetails: z.string().optional(),
    items: z.array(OrderItemSchema).min(1, "Please add at least one fuel item"),
  })
  .superRefine((data, ctx) => {
    if (data.paymentMethod === PaymentMethod.Cheque && !data.paymentDetails) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Cheque details required",
        path: ["paymentDetails"],
      });
    }
    if (data.orderType === OrderType.Delivery) {
      for (const [i, item] of data.items.entries()) {
        if (item.quantity < 1000) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Minimum 1000L per item for delivery orders",
            path: ["items", i, "quantity"],
          });
        }
      }
    }
  });

type PlaceOrderFormValues = z.infer<typeof PlaceOrderSchema>;
type DisplayOrderItem = {
  fuelTypeId: string;
  fuelTypeName: string;
  quantity: number;
  pricePerLiter: number;
};

const PlaceOrder: React.FC = () => {
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();
  const form = useForm<PlaceOrderFormValues>({
    resolver: zodResolver(PlaceOrderSchema),
    defaultValues: {
      orderType: OrderType.Delivery,
      paymentMethod: PaymentMethod.Cash,
      paymentDetails: "",
      items: [],
    },
  });

  // State for adding items
  const [selectedFuelId, setSelectedFuelId] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState<number | "">("");
  const [displayItems, setDisplayItems] = useState<DisplayOrderItem[]>([]);

  // Available fuels/prices based on order type
  const currentAvailableFuels = useMemo(() => {
    const referenceDate = new Date();
    return mockFuelTypes
      .filter((ft) => ft.is_available)
      .map((ft) => {
        const price = findCurrentPrice(ft.id, mockFuelPrices, referenceDate);
        return price
          ? {
              id: ft.id,
              name: ft.name,
              price:
                form.watch("orderType") === OrderType.Delivery
                  ? price.delivery_price_per_liter
                  : price.pickup_price_per_liter,
            }
          : null;
      })
      .filter(Boolean) as { id: string; name: string; price: number }[];
  }, [form.watch("orderType")]);

  // Add item handler
  const handleAddItem = () => {
    if (!selectedFuelId || !selectedQuantity || Number(selectedQuantity) <= 0) {
      toast.error("Select a fuel and enter a valid quantity.");
      return;
    }
    const fuel = currentAvailableFuels.find((f) => f.id === selectedFuelId);
    if (!fuel) {
      toast.error("Invalid fuel selection.");
      return;
    }
    const newDisplayItem: DisplayOrderItem = {
      fuelTypeId: fuel.id,
      fuelTypeName: fuel.name,
      quantity: Number(selectedQuantity),
      pricePerLiter: fuel.price,
    };
    setDisplayItems((prev) => [...prev, newDisplayItem]);
    // Update form items
    const currentItems = form.getValues("items");
    form.setValue(
      "items",
      [
        ...currentItems,
        {
          fuelTypeId: newDisplayItem.fuelTypeId,
          quantity: newDisplayItem.quantity,
        },
      ],
      { shouldValidate: true }
    );
    setSelectedFuelId("");
    setSelectedQuantity("");
  };

  // Remove item handler
  const handleRemoveItem = (index: number) => {
    setDisplayItems((prev) => prev.filter((_, i) => i !== index));
    const currentItems = form.getValues("items");
    const updatedItems = currentItems.filter((_, i) => i !== index);
    form.setValue("items", updatedItems, { shouldValidate: true });
  };

  // Mock API mutation
  const placeOrderAPI = async (data: PlaceOrderFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Order placed:", data);
    return { success: true };
  };
  const mutation = useMutation({
    mutationFn: placeOrderAPI,
    onSuccess: () => {
      toast.success("Order placed successfully!");
      navigate("/app/orders");
    },
    onError: () => {
      toast.error("Order failed. Please try again.");
    },
  });

  const onSubmit = (values: PlaceOrderFormValues) => {
    mutation.mutate(values);
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-2 bg-gray-50">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <ShoppingCart className="h-7 w-7 text-indigo-700" /> Place New Order
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Order Details Card */}
            <Card>
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="orderType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Order Type</FormLabel>
                      <FormControl>
                        <RadioGroup
                          value={field.value}
                          onValueChange={field.onChange}
                          className="flex flex-row gap-6"
                        >
                          <RadioGroupItem
                            value={OrderType.Delivery}
                            id="delivery"
                          />
                          <Label htmlFor="delivery">Delivery</Label>
                          <RadioGroupItem
                            value={OrderType.Pickup}
                            id="pickup"
                          />
                          <Label htmlFor="pickup">Pickup</Label>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Method</FormLabel>
                      <FormControl>
                        <RadioGroup
                          value={field.value}
                          onValueChange={field.onChange}
                          className="flex flex-row gap-6"
                        >
                          <RadioGroupItem
                            value={PaymentMethod.Cash}
                            id="cash"
                          />
                          <Label htmlFor="cash">Cash</Label>
                          <RadioGroupItem
                            value={PaymentMethod.Cheque}
                            id="cheque"
                          />
                          <Label htmlFor="cheque">Cheque</Label>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {form.watch("paymentMethod") === PaymentMethod.Cheque && (
                  <FormField
                    control={form.control}
                    name="paymentDetails"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cheque Details</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter cheque number or details"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </CardContent>
            </Card>

            {/* Add Items Card */}
            <Card>
              <CardHeader>
                <CardTitle>Add Fuel Items</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1">
                  <Label htmlFor="fuelType">Fuel Type</Label>
                  <Select
                    value={selectedFuelId}
                    onValueChange={setSelectedFuelId}
                  >
                    <SelectTrigger id="fuelType">
                      <SelectValue placeholder="Select fuel type" />
                    </SelectTrigger>
                    <SelectContent>
                      {currentAvailableFuels.map((fuel) => (
                        <SelectItem key={fuel.id} value={fuel.id}>
                          {fuel.name} (₱{fuel.price.toFixed(2)}/L)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <Label htmlFor="quantity">Quantity (L)</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min={1}
                    value={selectedQuantity}
                    onChange={(e) =>
                      setSelectedQuantity(
                        e.target.value ? Number(e.target.value) : ""
                      )
                    }
                    placeholder="Enter quantity"
                  />
                </div>
                <Button type="button" className="h-10" onClick={handleAddItem}>
                  Add Item
                </Button>
              </CardContent>
            </Card>

            {/* Order Items Table Card */}
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fuel Name</TableHead>
                      <TableHead>Quantity (L)</TableHead>
                      <TableHead>Price/L</TableHead>
                      <TableHead>Subtotal</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {displayItems.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center">
                          No items added.
                        </TableCell>
                      </TableRow>
                    ) : (
                      displayItems.map((item, idx) => (
                        <TableRow key={idx}>
                          <TableCell>{item.fuelTypeName}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>
                            ₱{item.pricePerLiter.toFixed(2)}
                          </TableCell>
                          <TableCell>
                            ₱
                            {(
                              item.pricePerLiter * item.quantity
                            ).toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                            })}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveItem(idx)}
                            >
                              <Trash2 className="h-4 w-4 text-red-600" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                className="w-48"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Placing Order...
                  </>
                ) : (
                  "Place Order"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default PlaceOrder;
